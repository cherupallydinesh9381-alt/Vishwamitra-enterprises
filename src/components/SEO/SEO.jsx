import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Vishwamitra Enterprises`
      : 'Vishwamitra Enterprises | Trusted Laptop Sales & Services';

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta(
      'description',
      description ||
        'Vishwamitra Enterprises - Best deals on new & refurbished laptops and professional repair services in Sangareddy, Telangana.'
    );
    if (keywords) setMeta('keywords', keywords);
  }, [title, description, keywords]);

  return null;
}
