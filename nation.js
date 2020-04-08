// fs 사용해서 넣고싶으면 ...
// var fs = require('browserify-fs');

class Nationcode {
    constructor() {
        this.list = [];
        this.$except = $(".wikitable").find('tbody>tr>td>span').parent();
        this.table = $(".wikitable").find('tbody>tr>td').not(this.$except).find();
        this.aTag = $(".wikitable").find('tbody>tr>td>span>a');
        this.init();
        this.timer;
        this.count = 0;
    }
    init() {
            // this.getCountryByCode("AF");
            var _this = this;
            // var $except = $(".wikitable").find('tbody>tr>td>span').parent();
            this.$except.each(function(i, d) {
                var obj = {};
                obj.country = d.innerText.trim();
                obj.code = _this.table.prevObject[i].innerText.trim();
                obj.url = $(d).find('span>a>img')[0].src;
                _this.list.push(obj);
            });
            this.getFlagImageFile();
        }
        // 1. 국가 코드로 국가 명을 가져오는 함수
    getCountryByCode(code) {
        if (code !== undefined) {
            var _this = this;
            $(".wikitable>tbody>tr>td").each(function(i, d) {
                // return (d.textContent === code) ? 
                if (d.innerText === code) {
                    _this.country = $(d).next()[0].innerText;
                    return _this.country.trim();
                } else {
                    return 0;
                }
            })
        } else {
            return console.log("code를 파라미터로 넣어주세요");
        }
    }

    // 2. 국가 코드 목록을 가져오는 함수
    getCountryCodeList() {
            return this.list.map(function(d) { return d.code })
        }
        // 3. 국가 명 목록을 가져오는 함수
    getCountryList() {

            return this.list.map(function(d) { return d.country })
        }
        // 4. 외부 사이트에 연결된 국기 이미지를 로컬의 flag 폴더로 가져온다.

    getFlagImageFile() {
        var _this = this;
        this.list.forEach(function(c) {
            _this.toDataURL(c.url, function(dataUrl, url) {
                var aTagData = [];
                _this.aTag.each(function(i, d) {
                    if ($(d).children().attr('src') === url.substr(5)) {
                        _this.list[i].Base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
                        aTagData.push(d);
                    } else {
                        return 0;
                    }
                })
                aTagData.forEach(function(d) {
                    var fileName = $(d).children().attr('alt');
                    $(d).attr('href', dataUrl).attr('download', fileName.replace(/\s/gi, '_') + ".png");
                });
            });
        });
    }
    getImageBase64() {
            // data = data.replace(/^data:image\/png;base64,/, '');
            // __dirname = path.resolve();
            var _this = this;
            setInterval(function() {
                fs.writeFile('count' + _this.count + '.png', _this.list[_this.count].Base64, 'base64', function(err) {
                    if (err) throw err;
                    // _this.count++;
                });
                _this.count++;
            }, 2000);
        }
        // 5. 국가 코드 또는 국가 명으로 국기 이미지 링크 ( url ) 정보를 가져온다.
    getFlagImageLink(param) {
        if (param !== undefined) {
            var result = nation.list.filter(function(d) {
                return (d.country === param || d.code === param);
            });
            return result.map(function(d) { return d.url });
        } else {
            return console.log(" 파라미터를 넣어주세요");
        }
    }

    getFlagObj() {
            return this.list;
        }
        // 6. 국가 코드, 국가 명, 국기 이미지( url ) 정보를 객체형태로 서비스 하는 함수
    toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result, url);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    imgDownload() {
        var _this = this;
        this.count = 0;

        this.timer = setInterval(function() {
            $(_this.aTag[_this.count]).get(0).click();
            _this.count++;
            if (_this.count === 248) {
                clearInterval(_this.timer);
            }
        }, 2000);
    }
    testFscount() {
            fs.readdir('/', (err, files) => {
                console.log(files);
            });
        }
        /* async downloadImage() {
            const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
            const path = Path.resolve(__dirname, 'pngColl', 'code.jpg');
            const writer = fs.createWriteStream(path);
            try {
                const response = await Axios({
                    url,
                    method: 'GET',
                    responseType: 'stream'
                })
                response.data.pipe(writer)
                return new Promise((resolve, reject) => {
                    writer.on('finish', resolve)
                    writer.on('error', reject)
                })
            } catch (error) {

            }
        } */

}

// global.Nationcode = Nationcode;