var raw = unescape('%u9ad8%u6e05%u4e2d%u5b57%24http%3A%2F%2Fcn2.zuidadianying.com%2F20181107%2FDmzmMNaf%2Findex.m3u8')
var b = raw.split("#");
var c = [];
var d = [];
b.forEach((i) => {
  let temp = i.split("$");
  if(temp.length>2){
    c.push(temp[0],'|',temp[4])
    d.push(temp[1],'|',temp[5])
  } else {
    c.push(temp[0])
    d.push(temp[1]);
  }
});
// var c = raw.split("$");
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(c);
console.log(c);
console.log(d);
