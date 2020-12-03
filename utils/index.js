// 计算年龄：几零后
export function computeAge(birthday) {
  const date = new Date(birthday).getFullYear();
  // console.log(date);
  if(2010 <= date && date < 2020) {
    return '10后'
  } 
  else if(2000 <= date && date < 2010) {
    return '00后'
  }
  else if(1990 <= date && date < 2000) {
    return '90后'
  }
  else if(1980 <= date && date < 1990) {
    return '80后'
  }
  else if(1970 <= date && date < 1980) {
    return '70后'
  }
  else if(1960 <= date && date < 1970) {
    return '60后'
  }
  else {
    return '60前'
  }
}

