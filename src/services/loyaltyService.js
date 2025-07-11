import firebaseDatabase from './firebaseDatabase';

class LoyaltyService {
  async calculatePointsForOrder(orderAmount) {
    try {
      const settings = await firebaseDatabase.getLoyaltySettings();
      const points = Math.floor(orderAmount * settings.points_per_rupee);
      return Math.min(points, settings.max_points_per_order || 500);
    } catch (error) {
      console.error('Error calculating points:', error);
      return Math.floor(orderAmount / 100); // Fallback: 1 point per ₹100
    }
  }

  async checkMinOrderValue(orderAmount) {
    try {
      const settings = await firebaseDatabase.getLoyaltySettings();
      return orderAmount >= settings.min_order_value;
    } catch (error) {
      console.error('Error checking min order value:', error);
      return orderAmount >= 1000; // Fallback: ₹1000 minimum
    }
  }

  async checkFreeShippingEligibility(orderAmount) {
    try {
      const settings = await firebaseDatabase.getLoyaltySettings();
      return orderAmount >= settings.free_shipping_threshold;
    } catch (error) {
      console.error('Error checking free shipping:', error);
      return orderAmount >= 2000; // Fallback: ₹2000 for free shipping
    }
  }

  async redeemPoints(userId, pointsToRedeem) {
    try {
      const user = await firebaseDatabase.getUserProfile(userId);
      if (!user || user.total_points < pointsToRedeem) {
        throw new Error('Insufficient points');
      }

      const settings = await firebaseDatabase.getLoyaltySettings();
      const discountAmount = pointsToRedeem * settings.point_redemption_value;

      // Deduct points from user
      await firebaseDatabase.updateUserPoints(userId, -pointsToRedeem);

      return {
        pointsRedeemed: pointsToRedeem,
        discountAmount,
        remainingPoints: user.total_points - pointsToRedeem
      };
    } catch (error) {
      console.error('Error redeeming points:', error);
      throw new Error('Failed to redeem points');
    }
  }

  async getUserLoyaltyStatus(userId) {
    try {
      const user = await firebaseDatabase.getUserProfile(userId);
      if (!user) return null;

      const settings = await firebaseDatabase.getLoyaltySettings();
      
      // Calculate loyalty tier based on total spent
      let tier = 'Bronze';
      if (user.total_spent >= 50000) tier = 'Platinum';
      else if (user.total_spent >= 25000) tier = 'Gold';
      else if (user.total_spent >= 10000) tier = 'Silver';

      return {
        currentPoints: user.total_points || 0,
        totalSpent: user.total_spent || 0,
        tier,
        pointValue: settings.point_redemption_value,
        nextTierThreshold: this.getNextTierThreshold(user.total_spent)
      };
    } catch (error) {
      console.error('Error getting loyalty status:', error);
      return null;
    }
  }

  getNextTierThreshold(currentSpent) {
    if (currentSpent < 10000) return 10000 - currentSpent;
    if (currentSpent < 25000) return 25000 - currentSpent;
    if (currentSpent < 50000) return 50000 - currentSpent;
    return 0; // Already at highest tier
  }
}

export default new LoyaltyService();