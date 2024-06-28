export default function countItems(arr) {
  let total = 0;
  if (arr){
    for (let i=0; i<arr.length; i++){
      total+=arr[i].length;
    }
  }
  return total;

}

