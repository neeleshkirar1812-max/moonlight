import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Moonlight Production | Royal Indian Wedding Photography & 4K Cinema Films';
const DEFAULT_DESC = "India's premier luxury wedding photography and 4K cinematography studio specializing in royal palace weddings, pre-wedding shoots, and destination celebrations across Bhopal, Maheshwar, Udaipur & all-India.";
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85';
const BASE_URL = 'https://moonlight-pink-two.vercel.app';

const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return;
  const selector = `meta[${attrName}="${attrValue}"]`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setCanonical = (url) => {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
};

const setJsonLd = (schemaData) => {
  let element = document.getElementById('page-dynamic-jsonld');
  if (!schemaData) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.id = 'page-dynamic-jsonld';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schemaData);
};

const SEO = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  schema,
}) => {
  const location = useLocation();
  const fullUrl = `${BASE_URL}${location.pathname}`;
  const fullTitle = title ? `${title} | Moonlight Production` : DEFAULT_TITLE;
  const metaDesc = description || DEFAULT_DESC;
  const metaImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    // 1. Page Title
    document.title = fullTitle;

    // 2. Primary Meta Tags
    setMetaTag('name', 'title', fullTitle);
    setMetaTag('name', 'description', metaDesc);
    if (keywords) setMetaTag('name', 'keywords', keywords);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:image', metaImage);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', type);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', metaImage);
    setMetaTag('name', 'twitter:url', fullUrl);

    // 5. Canonical Link
    setCanonical(fullUrl);

    // 6. JSON-LD Structured Data
    if (schema) {
      setJsonLd(schema);
    } else {
      setJsonLd(null);
    }
  }, [fullTitle, metaDesc, metaImage, fullUrl, type, keywords, schema]);

  return null;
};

export default SEO;
