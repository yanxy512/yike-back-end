const multer  = require('multer')
const mkdirs = require('../dao/mkdirs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let url = req.body.url
        mkdirs.mkdirs('../data/'+url,err=>{
            console.log(err)
        })
        cb(null, './data/'+url)
    },
    filename: function (req, file, cb) {
        let type = file.originalname.replace(/.+.\./,'.')
        let name = req.body.name
        cb(null, name+type )
    }
  })
  
const upload = multer({ storage: storage })

module.exports = function(app){
    app.post('/file/upload',upload.array('file', 1), function (req, res, next) {
        let data = req.body
        let url = req.body.url
        let name = req.files[0].filename
        let img_url ='/'+url+'/'+name
        res.send(img_url)
    })
}