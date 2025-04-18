const daysAgoFunction = (mongoDbTime: Date) => {
  const createdAt = new Date(mongoDbTime);
  const cuurentTime = new Date();
  const diffTime = Math.abs(cuurentTime.getTime() - createdAt.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export default daysAgoFunction;
