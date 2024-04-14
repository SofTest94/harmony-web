export const handleScheduleAppointmentClick = (telephone: string, message: string) => {
  const msg = encodeURIComponent(message);
  const url = `https://wa.me/${telephone}?text=${msg}`;
  window.open(url, '_blank');
};

export const handleSocialMediaClick = (url: string) => {
  window.open(url, '_blank');
};

// const handleFacebookClick = () => {
//   handleSocialMediaClick('https://www.facebook.com');
// };

// const handleYouTubeClick = () => {
//   handleSocialMediaClick('https://www.youtube.com');
// };

// const handleTikTokClick = () => {
//   handleSocialMediaClick('https://www.tiktok.com');
// };

// const handleInstagramClick = () => {
//   handleSocialMediaClick('https://www.instagram.com');
// };
