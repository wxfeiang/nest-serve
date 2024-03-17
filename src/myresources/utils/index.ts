export const changeType = (type: string) => {
  const typeArr = type.split(',');

  let key = '';
  switch (typeArr[1]) {
    case '影院':
      key = 'video';
      break;
    case '图文':
      key = typeArr[0].includes('xiaoshuo') ? 'html' : 'img';
      break;
    default:
      key = 'img';
      break;
  }

  return { type: typeArr[0], key };
};
