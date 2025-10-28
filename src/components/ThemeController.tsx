import { useEffect } from 'react';

interface ThemeControllerProps {
  children: React.ReactNode;
}

export const ThemeController: React.FC<ThemeControllerProps> = ({ children }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Determine theme based on section
            if (sectionId === 'sunset' || sectionId === 'watch') {
              document.body.setAttribute('data-theme', 'sunset');
            } else {
              document.body.setAttribute('data-theme', 'club');
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Set initial theme
    document.body.setAttribute('data-theme', 'club');

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
};
