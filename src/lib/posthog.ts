import posthog from 'posthog-js';

// Initialize PostHog
export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init('phc_zDXRhhjgMxXYySIJdzPuXroXzAAABNYzpH8TAyri1wo', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    });
  }
};

// Export the PostHog instance for usage
export default posthog;
