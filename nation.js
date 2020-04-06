class Nationcode {
    constructor() {
        this.list = [];
        this.$except = $(".wikitable").find('tbody>tr>td>span').parent();
        this.table = $(".wikitable").find('tbody>tr>td').not(this.$except).find();
        this.aTag = $(".wikitable").find('tbody>tr>td>span>a');
        this.init();
        this.getFlagImageFile();
        // this.country;
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
                // $('a').get(0).click();
                // return (d.textContent === code) ? 
                // if (d.innerText === code) {
                //     _this.country = $(d).next()[0].innerText;
                // } else {
                //     return 0;
                // }
                // _this.obj.country = $(d).next()[0].innerText;
            });
        }
        // 1. 국가 코드로 국가 명을 가져오는 함수
    getCountryByCode(code) {
        // var $except = $(".wikitable").find('tbody>tr>td>span').parent();
        // var table = $(".wikitable").find('tbody>tr>td').not($except).find(function(d, i) {
        //     return d;
        // })
        var _this = this;
        $(".wikitable>tbody>tr>td").each(function(i, d) {
            // return (d.textContent === code) ? 
            if (d.innerText === code) {
                _this.country = $(d).next()[0].innerText;
            } else {
                return 0;
            }
        })
        return _this.country.trim();
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
            //이부분다시!!!
            /* var _this = this;
            this.aTag.each(function(i, d) {
                $(d).attr({
                    href: _this.list[i].url,
                    download: true
                });
            }); */
            // $('a').get
        }
        // 5. 국가 코드 또는 국가 명으로 국기 이미지 링크 ( url ) 정보를 가져온다.
    getFlagImageLink() {
        return this.list.map(function(d) { return d.url })
    }

    getFlagObj() {
            return this.list;
        }
        // 6. 국가 코드, 국가 명, 국기 이미지( url ) 정보를 객체형태로 서비스 하는 함수
}

// global.Nationcode = Nationcode;