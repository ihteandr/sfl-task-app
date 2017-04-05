
export default class HttpProvider{
    doGet(path, options){
        return new Promise((resolve, reject)=>{
            var xhr = new XMLHttpRequest();
            let query = '';
            for(var i in options){
                query += i + '=' + options[i] + '&';
            }
            xhr.open('GET', path + '?' + query, true);

            xhr.send();

            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }

            }
        })
    }
}