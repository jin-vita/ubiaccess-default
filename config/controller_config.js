module.exports = [
    {id:2, type:'path', path:'/profile/list', method:['get','post'], file:'profile-controller', func:'list'},
    {id:3, type:'path', path:'/profile/get', method:['get','post'], file:'profile-controller', func:'get'},
    {id:4, type:'path', path:'/profile/add', method:['get'], file:'profile-controller', func:'add'},
    {id:5, type:'path', path:'/profile/upload', method:['post'], file:'profile-controller', func:'upload', upload:true},
    {id:6, type:'path', path:'/cookie/set_cookie', method:['get'], file:'cookie-controller', func:'set_cookie'},
    {id:7, type:'path', path:'/cookie/show_cookie', method:['get'], file:'cookie-controller', func:'show_cookie'},
    {id:8, type:'path', path:'/nas/upload', method:['post'], file:'nas-controller', func:'upload', upload:true},
    {id:9, type:'path', path:'/nas/list', method:['post'], file:'nas-controller', func:'get'},
    {id:10, type:'path', path:'/nas/delete', method:['post'], file:'nas-controller', func:'delete'},
];