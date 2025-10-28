import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Gig {
  date: string;
  venue: string;
  location: string;
  time: string;
  status: 'upcoming' | 'sold-out' | 'cancelled';
}

// TODO: Replace with actual upcoming gigs data
const upcomingGigs: Gig[] = [
  // Example gigs - replace with real data
  // {
  //   date: '2024-03-15',
  //   venue: 'Electric Ballroom',
  //   location: 'London, UK',
  //   time: '22:00',
  //   status: 'upcoming'
  // },
  // {
  //   date: '2024-03-22',
  //   venue: 'Berghain',
  //   location: 'Berlin, Germany',
  //   time: '23:00',
  //   status: 'sold-out'
  // }
];

export const Gigs: React.FC = () => {
  // Hide section if no upcoming gigs
  if (upcomingGigs.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: Gig['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-green-400';
      case 'sold-out':
        return 'text-red-400';
      case 'cancelled':
        return 'text-gray-400';
      default:
        return 'text-text';
    }
  };

  const getStatusText = (status: Gig['status']) => {
    switch (status) {
      case 'upcoming':
        return 'Tickets Available';
      case 'sold-out':
        return 'Sold Out';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  return (
    <section id="gigs" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            Upcoming Gigs
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            Catch LÜMEN live at these upcoming events. Don't miss out on the experience.
          </p>
        </motion.div>

        <div className="space-y-6">
          {upcomingGigs.map((gig, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-lg hover:bg-accent/5 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <Calendar size={20} className="text-accent" />
                    <span className="text-text font-semibold text-lg">
                      {formatDate(gig.date)}
                    </span>
                    <Clock size={16} className="text-text/60" />
                    <span className="text-text/80">{gig.time}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin size={20} className="text-accent" />
                    <div>
                      <h3 className="text-text font-semibold">{gig.venue}</h3>
                      <p className="text-text/80">{gig.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <span className={`text-sm font-semibold ${getStatusColor(gig.status)}`}>
                    {getStatusText(gig.status)}
                  </span>
                  {gig.status === 'upcoming' && (
                    <button className="ml-4 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring">
                      Get Tickets
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl">
            <h3 className="font-display text-2xl font-bold text-accent mb-4">
              Want to Book LÜMEN?
            </h3>
            <p className="text-text/80 mb-6">
              Don't see your event listed? Get in touch to discuss booking LÜMEN for your venue or event.
            </p>
            <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105">
              Contact for Booking
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
