export function getDeliveryTime(duration, cookingTime, dealers) {
  let hours;
  let minutes = Math.round(duration / 60) + cookingTime * dealers;
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
  }

  const prePhrase = "Approximate delivery time ";
  const getHour =
    hours === undefined ? "" : hours > 1 ? `${hours} hours ` : `${hours} hour `;
  const getMinutes = minutes > 1 ? `${minutes} minutes.` : `${minutes} minute.`;
  return prePhrase + getHour + getMinutes;
}
