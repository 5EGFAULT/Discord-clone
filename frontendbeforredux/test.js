const http_req_contries = new XMLHttpRequest();
http_req_contries.open("POST", "localhost:3003/register");
http_req_contries.onreadystatechange = () => {
  if (http_req_contries.readyState === 4 && http_req_contries.status == 200) {
    // console.log(JSON.parse(http_req_contries.response));
    console.log(http_req_contries.response);
  }
};
console.log(http_req_contries);

http_req_contries.send();
console.log(http_req_contries);
