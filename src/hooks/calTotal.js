export default function calTotal(arr){
  if (!arr) return;
  let total=0;

  for (let i=0; i<arr.length; i++){
    let obj = arr[i];
    //현재 객체
    let [count, price] = [+obj.count, +obj.price];

    total += (count*price);
  }
  console.log("총합액", total);
  return total;
}