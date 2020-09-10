//高德坐标转百度
const gaodeTobaidu = (gg_lng, gg_lat) =>{
    let X_PI = Math.PI * 3000.0 / 180.0;
    let x = gg_lng, y = gg_lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return {
        latitude : bd_lat,
        longitude : bd_lng
    };
}

//url拼接
const getImageUrl = ( file , width , height )=>{
    let filename = file.filename,
        filepath = file.filepath,
        src;
    if( filename.indexOf('{$hgPicSizeStart}') > 0 ){
        filename = filename.replace('{$hgPicSizeStart}', '' );
        filename = filename.replace('{$hgPicSizeEnd}', '' );
        filename = filename.replace('{$hgPicSizeWidth}', width );
        filename = filename.replace('{$hgPicSizeHeight}', height );
        src = [file.host, file.dir, filepath, filename].join('');
    }else{
        if( width && height ){
            src = file.host + file.dir + width + 'x' + height + '/' +  filepath + filename;
        }else{
            if( file.imgwidth && file.imgheight ){
                    src = file.host + file.dir + file.imgwidth + 'x' + file.imgheight + '/' +  filepath + filename;
            }else{
                    src = file.host + file.dir + filepath + filename;
            }
        }
    }
    return src;
}

//获取当前时间
const getcurrentDateTime = () =>{
    let date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let min = date.getMinutes()
    let hour = date.getHours()
    let sec = date.getSeconds()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (min >= 1 && min <= 9) {
        min = "0" + min
    }
    if (sec >= 1 && sec <= 9) {
        sec = "0" + sec
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour
    }
    let currentdate = date.getFullYear() + '-' + month + '-' + strDate + " " + hour + ':' + min + ':' + sec
    return  currentdate
}

//时间格式化
const timeFormat = (inputTime) =>{
    inputTime = parseInt(inputTime)*1000;
    var date = new Date(inputTime);    
    var y = date.getFullYear();      
    var m = date.getMonth() + 1;      
    m = m < 10 ? ('0' + m) : m;      
    var d = date.getDate();      
    d = d < 10 ? ('0' + d) : d;      
    var h = date.getHours();    
    h = h < 10 ? ('0' + h) : h;    
    var minute = date.getMinutes();    
    var second = date.getSeconds();    
    minute = minute < 10 ? ('0' + minute) : minute;      
    second = second < 10 ? ('0' + second) : second; 
    var time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    return time.slice(5,10);
}

//把数字转化成数组
const preFixInterge  = (num,n)=>{
    return (Array(n).join(0) + num).slice(-n).split('');
}

// 图片处理
const handleImg = (img) => {
  if (typeof img === 'string') {
    return img
  } else if (typeof img === 'object') {
    return `${img.host}${img.filename}`
  }
}

// 得到当前时分
const getNowTime = () => {
    let date = new Date()
    let time = `${date.getHours()}:${date.getMinutes()}`
    return time
}

// storage
const storage = {
    set (key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get (key) {
        return JSON.parse(localStorage.getItem(key))
    },
    remove (key) {
        localStorage.removeItem(key)
    }
}


export {
    gaodeTobaidu , getImageUrl , getcurrentDateTime , preFixInterge , timeFormat, handleImg, getNowTime, storage
}
