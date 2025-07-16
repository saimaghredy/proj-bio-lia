import React from 'react';

const PageHeader = ({ title, subtitle, children }) => (
  <section className="w-full py-16 px-4 text-center bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
    <h1 className="text-4xl md:text-5xl font-serif text-[#2f3a29] font-light mb-6 animate-fade-in">
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl text-[#2f3a29] max-w-3xl mx-auto mb-8 font-jakarta">
        {subtitle}
      </p>
    )}
    {children}
  </section>
);

export default PageHeader;