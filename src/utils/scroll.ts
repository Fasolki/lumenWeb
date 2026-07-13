export const scrollToEmail = () => {
  const element =
    document.getElementById('contact-email') ?? document.getElementById('contact');

  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export const scrollToSection = (anchor: string) => {
  document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
};
