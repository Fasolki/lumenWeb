export const scrollToEmail = () => {
  const element =
    document.getElementById('contact-email') ?? document.getElementById('contact');

  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
