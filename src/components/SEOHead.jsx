import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEOHead Component
 * 
 * Manages all meta tags, Open Graph data, Twitter Card tags, and structured data
 * for SEO optimization. This component ensures proper metadata is present in the
 * initial HTML payload for search engine crawlers and social media platforms.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.5, 4.1, 4.2, 4.3
 */
const SEOHead = ({ title, description, canonicalUrl, ogImage, structuredData }) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && structuredData.person && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData.person)}
        </script>
      )}
      
      {structuredData && structuredData.projects && structuredData.projects.map((project, index) => (
        <script key={`project-${index}`} type="application/ld+json">
          {JSON.stringify(project)}
        </script>
      ))}
      
      {structuredData && structuredData.contact && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData.contact)}
        </script>
      )}
    </Helmet>
  );
};

SEOHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
  ogImage: PropTypes.string,
  structuredData: PropTypes.shape({
    person: PropTypes.object,
    projects: PropTypes.arrayOf(PropTypes.object),
    contact: PropTypes.object,
  }),
};

export default SEOHead;
