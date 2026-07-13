/**
 * All the "Book" / "Contact" calls to action land on the booking form, falling
 * back to the contact section if it isn't on the page.
 */
export const scrollToBooking = () => {
  const element =
    document.getElementById('booking-form') ?? document.getElementById('contact');

  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const scrollToSection = (anchor: string) => {
  document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
};
