export const getMemoryImage = (filename: string): string => {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}images/memories/${filename}`;
};

export const handleImageFallback = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  filename: string
) => {
  const target = e.currentTarget;
  if (!target.dataset.triedRelative) {
    target.dataset.triedRelative = 'true';
    target.src = `./images/memories/${filename}`;
  } else if (!target.dataset.triedRaw) {
    target.dataset.triedRaw = 'true';
    target.src = `https://raw.githubusercontent.com/satwik92105-png/aarna-birthday-website/master/public/images/memories/${filename}`;
  }
};
