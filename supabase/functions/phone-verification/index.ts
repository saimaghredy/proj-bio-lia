import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MSG91Response {
  type: string;
  message: string;
  request_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    const { phone_number, otp, action } = await req.json()

    // MSG91 configuration
    const MSG91_AUTH_KEY = Deno.env.get('MSG91_AUTH_KEY')
    const MSG91_TEMPLATE_ID = Deno.env.get('MSG91_TEMPLATE_ID')
    
    if (!MSG91_AUTH_KEY || !MSG91_TEMPLATE_ID) {
      throw new Error('MSG91 configuration missing')
    }

    if (action === 'send') {
      // Send OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Send OTP via MSG91
      const msg91Response = await fetch('https://api.msg91.com/api/v5/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authkey': MSG91_AUTH_KEY
        },
        body: JSON.stringify({
          template_id: MSG91_TEMPLATE_ID,
          mobile: phone_number,
          authkey: MSG91_AUTH_KEY,
          otp: otpCode,
          otp_length: 6,
          otp_expiry: 5
        })
      })

      const msg91Data: MSG91Response = await msg91Response.json()

      if (msg91Data.type === 'success') {
        // Store OTP verification record
        const { error: dbError } = await supabaseClient
          .from('phone_verifications')
          .insert({
            user_id: user.id,
            phone_number: phone_number,
            otp_code: otpCode,
            status: 'sent',
            msg91_request_id: msg91Data.request_id,
            expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
          })

        if (dbError) {
          console.error('Database error:', dbError)
          throw new Error('Failed to store verification record')
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: 'OTP sent successfully',
            expires_in: 300
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      } else {
        throw new Error(msg91Data.message || 'Failed to send OTP')
      }

    } else if (action === 'verify') {
      // Verify OTP
      const { data: verification, error: fetchError } = await supabaseClient
        .from('phone_verifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('phone_number', phone_number)
        .eq('status', 'sent')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (fetchError || !verification) {
        throw new Error('No pending verification found')
      }

      // Check if OTP is expired
      if (new Date() > new Date(verification.expires_at)) {
        await supabaseClient
          .from('phone_verifications')
          .update({ status: 'expired' })
          .eq('id', verification.id)
        
        throw new Error('OTP has expired')
      }

      // Verify OTP
      if (verification.otp_code === otp) {
        // Mark as verified
        await supabaseClient
          .from('phone_verifications')
          .update({ 
            status: 'verified',
            verified_at: new Date().toISOString()
          })
          .eq('id', verification.id)

        // Update user profile
        await supabaseClient
          .from('users')
          .update({ 
            phone_verified: true,
            phone_verified_at: new Date().toISOString(),
            phone_number: phone_number
          })
          .eq('id', user.id)

        return new Response(
          JSON.stringify({
            success: true,
            verified: true,
            message: 'Phone number verified successfully'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      } else {
        // Increment attempts
        await supabaseClient
          .from('phone_verifications')
          .update({ 
            verification_attempts: verification.verification_attempts + 1
          })
          .eq('id', verification.id)

        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            message: 'Invalid OTP',
            attempts_remaining: 3 - (verification.verification_attempts + 1)
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }
    }

  } catch (error) {
    console.error('Phone verification error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})