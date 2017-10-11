/**
 * @fileoverview 鐧惧害鍦板浘鐨勮建杩硅窡闅忕被锛屽澶栧紑鏀俱€�
 * 鐢ㄦ埛鍙互鍦ㄥ湴鍥句笂鑷畾涔夎建杩硅繍鍔�
 * 鍙互鑷畾涔夎矾杩囨煇涓偣鐨勫浘鐗囷紝鏂囧瓧浠嬬粛绛夈€�
 * 涓诲叆鍙ｇ被鏄�<a href="symbols/BMapLib.LuShu.html">LuShu</a>锛�
 * 鍩轰簬Baidu Map API 1.2銆�.
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */

/**
 * @namespace BMap鐨勬墍鏈塴ibrary绫诲潎鏀惧湪BMapLib鍛藉悕绌洪棿涓�
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
    //澹版槑baidu鍖�
    var T, baidu = T = baidu || {version: '1.5.0'};
    baidu.guid = '$BAIDU$';
    //浠ヤ笅鏂规硶涓虹櫨搴angram妗嗘灦涓殑鏂规硶锛岃鍒癶ttp://tangram.baidu.com 鏌ョ湅鏂囨。
    (function() {
        window[baidu.guid] = window[baidu.guid] || {};
        baidu.dom = baidu.dom || {};
        baidu.dom.g = function(id) {
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };
        baidu.g = baidu.G = baidu.dom.g;
        baidu.lang = baidu.lang || {};
        baidu.lang.isString = function(source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };
        baidu.isString = baidu.lang.isString;
        baidu.dom._g = function(id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };
        baidu._g = baidu.dom._g;
        baidu.dom.getDocument = function(element) {
            element = baidu.dom.g(element);
            return element.nodeType == 9 ? element : element.ownerDocument || element.document;
        };
        baidu.browser = baidu.browser || {};
        baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
        baidu.dom.getComputedStyle = function(element, key) {
            element = baidu.dom._g(element);
            var doc = baidu.dom.getDocument(element),
                styles;
            if (doc.defaultView && doc.defaultView.getComputedStyle) {
                styles = doc.defaultView.getComputedStyle(element, null);
                if (styles) {
                    return styles[key] || styles.getPropertyValue(key);
                }
            }
            return '';
        };
        baidu.dom._styleFixer = baidu.dom._styleFixer || {};
        baidu.dom._styleFilter = baidu.dom._styleFilter || [];
        baidu.dom._styleFilter.filter = function(key, value, method) {
            for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
                if (filter = filter[method]) {
                    value = filter(key, value);
                }
            }
            return value;
        };
        baidu.string = baidu.string || {};


        baidu.string.toCamelCase = function(source) {

            if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                return source;
            }
            return source.replace(/[-_][^-_]/g, function(match) {
                return match.charAt(1).toUpperCase();
            });
        };
        baidu.dom.getStyle = function(element, key) {
            var dom = baidu.dom;
            element = dom.g(element);
            key = baidu.string.toCamelCase(key);

            var value = element.style[key] ||
                (element.currentStyle ? element.currentStyle[key] : '') ||
                dom.getComputedStyle(element, key);

            if (!value) {
                var fixer = dom._styleFixer[key];
                if (fixer) {
                    value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
                }
            }

            if (fixer = dom._styleFilter) {
                value = fixer.filter(key, value, 'get');
            }
            return value;
        };
        baidu.getStyle = baidu.dom.getStyle;
        baidu.dom._NAME_ATTRS = (function() {
            var result = {
                'cellpadding': 'cellPadding',
                'cellspacing': 'cellSpacing',
                'colspan': 'colSpan',
                'rowspan': 'rowSpan',
                'valign': 'vAlign',
                'usemap': 'useMap',
                'frameborder': 'frameBorder'
            };

            if (baidu.browser.ie < 8) {
                result['for'] = 'htmlFor';
                result['class'] = 'className';
            } else {
                result['htmlFor'] = 'for';
                result['className'] = 'class';
            }

            return result;
        })();
        baidu.dom.setAttr = function(element, key, value) {
            element = baidu.dom.g(element);
            if ('style' == key) {
                element.style.cssText = value;
            } else {
                key = baidu.dom._NAME_ATTRS[key] || key;
                element.setAttribute(key, value);
            }
            return element;
        };
        baidu.setAttr = baidu.dom.setAttr;
        baidu.dom.setAttrs = function(element, attributes) {
            element = baidu.dom.g(element);
            for (var key in attributes) {
                baidu.dom.setAttr(element, key, attributes[key]);
            }
            return element;
        };
        baidu.setAttrs = baidu.dom.setAttrs;
        baidu.dom.create = function(tagName, opt_attributes) {
            var el = document.createElement(tagName),
                attributes = opt_attributes || {};
            return baidu.dom.setAttrs(el, attributes);
        };
        baidu.object = baidu.object || {};
        baidu.extend =
            baidu.object.extend = function(target, source) {
                for (var p in source) {
                    if (source.hasOwnProperty(p)) {
                        target[p] = source[p];
                    }
                }
                return target;
            };
    })();

    /**
     * @exports LuShu as BMapLib.LuShu
     */
    var LuShu =
        /**
         * LuShu绫荤殑鏋勯€犲嚱鏁�
         * @class LuShu <b>鍏ュ彛</b>銆�
         * 瀹炰緥鍖栬绫诲悗锛屽彲璋冪敤,start,end,pause绛夋柟娉曟帶鍒惰鐩栫墿鐨勮繍鍔ㄣ€�

         * @constructor
         * @param {Map} map Baidu map鐨勫疄渚嬪璞�.
         * @param {Array} path 鏋勬垚璺嚎鐨刾oint鐨勬暟缁�.
         * @param {Json Object} opts 鍙€夌殑杈撳叆鍙傛暟锛岄潪蹇呭～椤广€傚彲杈撳叆閫夐」鍖呮嫭锛�<br />
         * {<br />"<b>landmarkPois</b>" : {Array} 瑕佸湪瑕嗙洊鐗╃Щ鍔ㄨ繃绋嬩腑锛屾樉绀虹殑鐗规畩鐐广€傛牸寮忓涓�:landmarkPois:[<br />
         *      {lng:116.314782,lat:39.913508,html:'鍔犳补绔�',pauseTime:2},<br />
         *      {lng:116.315391,lat:39.964429,html:'楂橀€熷叕璺敹璐圭珯,pauseTime:3}]<br />
         * <br />"<b>icon</b>" : {Icon} 瑕嗙洊鐗╃殑icon,
         * <br />"<b>speed</b>" : {Number} 瑕嗙洊鐗╃Щ鍔ㄩ€熷害锛屽崟浣嶇背/绉�    <br />
         * <br />"<b>defaultContent</b>" : {String} 瑕嗙洊鐗╀腑鐨勫唴瀹�    <br />
         * }<br />.
         * @example <b>鍙傝€冪ず渚嬶細</b><br />
         * var lushu = new BMapLib.LuShu(map,arrPois,{defaultContent:"浠庡寳浜埌澶╂触",landmarkPois:[]});
         */
        BMapLib.LuShu = function(map, path, opts) {
            if (!path || path.length < 1) {
                return;
            }
            this._map = map;
            //瀛樺偍涓€鏉¤矾绾�
            this._path = path;
            //绉诲姩鍒板綋鍓嶇偣鐨勭储寮�
            this.i = 0;
            //鎺у埗鏆傚仠鍚庡紑濮嬬Щ鍔ㄧ殑闃熷垪鐨勬暟缁�
            this._setTimeoutQuene = [];
            //杩涜鍧愭爣杞崲鐨勭被
            this._projection = this._map.getMapType().getProjection();
            this._opts = {
                icon: null,
                //榛樿閫熷害 绫�/绉�
                speed: 4000,
                defaultContent: ''
            };
            this._setOptions(opts);
            this._rotation = 0;//灏忚溅杞姩鐨勮搴�

            //濡傛灉涓嶆槸榛樿瀹炰緥锛屽垯浣跨敤榛樿鐨刬con
            if (!this._opts.icon instanceof BMap.Icon) {
                this._opts.icon = defaultIcon;
            }
        }
    /**
     * 鏍规嵁鐢ㄦ埛杈撳叆鐨刼pts锛屼慨鏀归粯璁ゅ弬鏁癬opts
     * @param {Json Object} opts 鐢ㄦ埛杈撳叆鐨勪慨鏀瑰弬鏁�.
     * @return 鏃犺繑鍥炲€�.
     */
    LuShu.prototype._setOptions = function(opts) {
        if (!opts) {
            return;
        }
        for (var p in opts) {
            if (opts.hasOwnProperty(p)) {
                this._opts[p] = opts[p];
            }
        }
    }

    /**
     * @description 寮€濮嬭繍鍔�
     * @param none
     * @return 鏃犺繑鍥炲€�.
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * lushu.start();
     */
    LuShu.prototype.start = function() {
        var me = this,
            len = me._path.length;
        //涓嶆槸绗竴娆＄偣鍑诲紑濮�,骞朵笖灏忚溅杩樻病鍒拌揪缁堢偣
        if (me.i && me.i < len - 1) {
            //娌℃寜pause鍐嶆寜start涓嶅仛澶勭悊
            if (!me._fromPause) {
                return;
            }else if(!me._fromStop){
                //鎸変簡pause鎸夐挳,骞朵笖鍐嶆寜start锛岀洿鎺ョЩ鍔ㄥ埌涓嬩竴鐐�
                //骞朵笖姝よ繃绋嬩腑锛屾病鏈夋寜stop鎸夐挳
                //闃叉鍏坰top锛屽啀pause锛岀劧鍚庤繛缁笉鍋滅殑start鐨勫紓甯�
                me._moveNext(++me.i);
            }
        }else {
            //绗竴娆＄偣鍑诲紑濮嬶紝鎴栬€呯偣浜唖top涔嬪悗鐐瑰紑濮�
            me._addMarker();
            //绛夊緟marker鍔ㄧ敾瀹屾瘯鍐嶅姞杞絠nfowindow
            me._timeoutFlag = setTimeout(function() {
                me._addInfoWin();
                if(me._opts.defaultContent == ""){
                    me.hideInfoWindow();
                }
                me._moveNext(me.i);
            },400);
        }
        //閲嶇疆鐘舵€�
        this._fromPause = false;
        this._fromStop = false;
    },
        /**
         * 缁撴潫杩愬姩
         * @return 鏃犺繑鍥炲€�.
         *
         * @example <b>鍙傝€冪ず渚嬶細</b><br />
         * lushu.stop();
         */
        LuShu.prototype.stop = function() {
            this.i = 0;
            this._fromStop = true;
            clearInterval(this._intervalFlag);
            this._clearTimeout();
            //閲嶇疆landmark閲岃竟鐨刾oi涓烘湭鏄剧ず鐘舵€�
            for (var i = 0, t = this._opts.landmarkPois, len = t.length; i < len; i++) {
                t[i].bShow = false;
            }
        };
    /**
     * 鏆傚仠杩愬姩
     * @return 鏃犺繑鍥炲€�.
     */
    LuShu.prototype.pause = function() {
        clearInterval(this._intervalFlag);

        //鏍囪瘑鏄惁鏄寜杩噋ause鎸夐挳
        this._fromPause = true;
        this._clearTimeout();
    };
    /**
     * 闅愯棌涓婃柟overlay
     * @return 鏃犺繑鍥炲€�.
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * lushu.hideInfoWindow();
     */
    LuShu.prototype.hideInfoWindow = function() {
        this._overlay._div.style.visibility = 'hidden';
    };
    /**
     * 鏄剧ず涓婃柟overlay
     * @return 鏃犺繑鍥炲€�.
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * lushu.showInfoWindow();
     */
    LuShu.prototype.showInfoWindow = function() {
        this._overlay._div.style.visibility = 'visible';
    };
    //Lushu绉佹湁鏂规硶
    baidu.object.extend(LuShu.prototype, {
        /**
         * 娣诲姞marker鍒板湴鍥句笂
         * @param {Function} 鍥炶皟鍑芥暟.
         * @return 鏃犺繑鍥炲€�.
         */
        _addMarker: function(callback) {
            if (this._marker) {
                this.stop();
                this._map.removeOverlay(this._marker);
                clearTimeout(this._timeoutFlag);
            }
            //绉婚櫎涔嬪墠鐨刼verlay
            this._overlay && this._map.removeOverlay(this._overlay);
            var marker = new BMap.Marker(this._path[0]);
            this._opts.icon && marker.setIcon(this._opts.icon);
            this._map.addOverlay(marker);
           // marker.setAnimation(BMAP_ANIMATION_DROP);  //update by liushk 禁止初始化的动态效果
            this._marker = marker;
        },
        /**
         * 娣诲姞涓婃柟overlay
         * @return 鏃犺繑鍥炲€�.
         */
        _addInfoWin: function() {
            var me = this;
            //if(me._opts.defaultContent!== ""){
            var overlay = new CustomOverlay(me._marker.getPosition(), me._opts.defaultContent);

            //灏嗗綋鍓嶇被鐨勫紩鐢ㄤ紶缁檕verlay銆�
            overlay.setRelatedClass(this);
            this._overlay = overlay;
            this._map.addOverlay(overlay);

            //}

        },
        /**
         * 鑾峰彇澧ㄥ崱鎵樺潗鏍�
         * @param {Point} poi 缁忕含搴﹀潗鏍�.
         * @return 鏃犺繑鍥炲€�.
         */
        _getMercator: function(poi) {
            return this._map.getMapType().getProjection().lngLatToPoint(poi);
        },
        /**
         * 璁＄畻涓ょ偣闂寸殑璺濈
         * @param {Point} poi 缁忕含搴﹀潗鏍嘇鐐�.
         * @param {Point} poi 缁忕含搴﹀潗鏍嘊鐐�.
         * @return 鏃犺繑鍥炲€�.
         */
        _getDistance: function(pxA, pxB) {
            return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
        },
        //鐩爣鐐圭殑  褰撳墠鐨勬闀�,position,鎬荤殑姝ラ暱,鍔ㄧ敾鏁堟灉,鍥炶皟
        /**
         * 绉诲姩灏忚溅
         * @param {Number} poi 褰撳墠鐨勬闀�.
         * @param {Point} initPos 缁忕含搴﹀潗鏍囧垵濮嬬偣.
         * @param {Point} targetPos 缁忕含搴﹀潗鏍囩洰鏍囩偣.
         * @param {Function} effect 缂撳姩鏁堟灉.
         * @return 鏃犺繑鍥炲€�.
         */
        _move: function(initPos,targetPos,effect) {
            var me = this,
                //褰撳墠鐨勫抚鏁�
                currentCount = 0,
                //姝ラ暱锛岀背/绉�
                timer = 10,
                step = this._opts.speed / (1000 / timer),
                //鍒濆鍧愭爣
                init_pos = this._projection.lngLatToPoint(initPos),
                //鑾峰彇缁撴潫鐐圭殑(x,y)鍧愭爣
                target_pos = this._projection.lngLatToPoint(targetPos),
                //鎬荤殑姝ラ暱
                count = Math.round(me._getDistance(init_pos, target_pos) / step);

            //濡傛灉灏忎簬1鐩存帴绉诲姩鍒颁笅涓€鐐�
            if (count < 1) {
                me._moveNext(++me.i);
                return;
            }
            //涓ょ偣涔嬮棿鍖€閫熺Щ鍔�
            me._intervalFlag = setInterval(function() {
                //涓ょ偣涔嬮棿褰撳墠甯ф暟澶т簬鎬诲抚鏁扮殑鏃跺€欙紝鍒欒鏄庡凡缁忓畬鎴愮Щ鍔�
                if (currentCount >= count) {
                    clearInterval(me._intervalFlag);
                    //绉诲姩鐨勭偣宸茬粡瓒呰繃鎬荤殑闀垮害
                    if(me.i > me._path.length){
                        return;
                    }
                    //杩愯涓嬩竴涓偣
                    me._moveNext(++me.i);
                }else {
                    currentCount++;
                    var x = effect(init_pos.x, target_pos.x, currentCount, count),
                        y = effect(init_pos.y, target_pos.y, currentCount, count),
                        pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
                    //璁剧疆marker
                    if(currentCount == 1){
                        var proPos = null;
                        if(me.i - 1 >= 0){
                            proPos = me._path[me.i - 1];
                        }
                        if(me._opts.enableRotation == true){
                            me.setRotation(proPos,initPos,targetPos);
                        }
                        if(me._opts.autoView){
                            if(!me._map.getBounds().containsPoint(pos)){
                                me._map.setCenter(pos);
                            }
                        }
                    }
                    //姝ｅ湪绉诲姩

                    me._marker.setPosition(pos);
                    //璁剧疆鑷畾涔塷verlay鐨勪綅缃�
                    me._setInfoWin(pos);




                }
            },timer);
        },
        /**
         *鍦ㄦ瘡涓偣鐨勭湡瀹炴楠や腑璁剧疆灏忚溅杞姩鐨勮搴�
         */
        setRotation : function(prePos,curPos,targetPos){
            var me = this;
            var deg = 0;
            //start!
            curPos =  me._map.pointToPixel(curPos);
            targetPos =  me._map.pointToPixel(targetPos);

            if(targetPos.x != curPos.x){
                var tan = (targetPos.y - curPos.y)/(targetPos.x - curPos.x),
                    atan  = Math.atan(tan);
                deg = atan*360/(2*Math.PI);
                //degree  correction;
                if(targetPos.x < curPos.x){
                    deg = -deg + 90 + 90;

                } else {
                    deg = -deg;
                }

                me._marker.setRotation(-deg);

            }else {
                var disy = targetPos.y- curPos.y ;
                var bias = 0;
                if(disy > 0)
                    bias=-1
                else
                    bias = 1
                me._marker.setRotation(-bias * 90);
            }
            return;

        },

        linePixellength : function(from,to){
            return Math.sqrt(Math.abs(from.x- to.x) * Math.abs(from.x- to.x) + Math.abs(from.y- to.y) * Math.abs(from.y- to.y) );

        },
        pointToPoint : function(from,to ){
            return Math.abs(from.x- to.x) * Math.abs(from.x- to.x) + Math.abs(from.y- to.y) * Math.abs(from.y- to.y)

        },
        /**
         * 绉诲姩鍒颁笅涓€涓偣
         * @param {Number} index 褰撳墠鐐圭殑绱㈠紩.
         * @return 鏃犺繑鍥炲€�.
         */
        _moveNext: function(index) {
            var me = this;
            if (index < this._path.length - 1) {
                me._move(me._path[index], me._path[index + 1], me._tween.linear);
            }
        },
        /**
         * 璁剧疆灏忚溅涓婃柟infowindow鐨勫唴瀹癸紝浣嶇疆绛�
         * @param {Point} pos 缁忕含搴﹀潗鏍囩偣.
         * @return 鏃犺繑鍥炲€�.
         */
        _setInfoWin: function(pos) {
            //璁剧疆涓婃柟overlay鐨刾osition
            var me = this;
            if(!me._overlay){
                return;
            }
            me._overlay.setPosition(pos, me._marker.getIcon().size);
            var index = me._troughPointIndex(pos);
            if (index != -1) {
                clearInterval(me._intervalFlag);
                me._overlay.setHtml(me._opts.landmarkPois[index].html);
                me._overlay.setPosition(pos, me._marker.getIcon().size);
                me._pauseForView(index);
            }else {
                me._overlay.setHtml(me._opts.defaultContent);
            }
        },
        /**
         * 鍦ㄦ煇涓偣鏆傚仠鐨勬椂闂�
         * @param {Number} index 鐐圭殑绱㈠紩.
         * @return 鏃犺繑鍥炲€�.
         */
        _pauseForView: function(index) {
            var me = this;
            var t = setTimeout(function() {
                //杩愯涓嬩竴涓偣
                me._moveNext(++me.i);
            },me._opts.landmarkPois[index].pauseTime * 1000);
            me._setTimeoutQuene.push(t);
        },
        //娓呴櫎鏆傚仠鍚庡啀寮€濮嬭繍琛岀殑timeout
        _clearTimeout: function() {
            for (var i in this._setTimeoutQuene) {
                clearTimeout(this._setTimeoutQuene[i]);
            }
            this._setTimeoutQuene.length = 0;
        },
        //缂撳姩鏁堟灉
        _tween: {
            //鍒濆鍧愭爣锛岀洰鏍囧潗鏍囷紝褰撳墠鐨勬闀匡紝鎬荤殑姝ラ暱
            linear: function(initPos, targetPos, currentCount, count) {
                var b = initPos, c = targetPos - initPos, t = currentCount,
                    d = count;
                return c * t / d + b;
            }
        },

        /**
         * 鍚︾粡杩囨煇涓偣鐨刬ndex
         * @param {Point} markerPoi 褰撳墠灏忚溅鐨勫潗鏍囩偣.
         * @return 鏃犺繑鍥炲€�.
         */
        _troughPointIndex: function(markerPoi) {
            var t = this._opts.landmarkPois, distance;
            for (var i = 0, len = t.length; i < len; i++) {
                //landmarkPois涓殑鐐规病鏈夊嚭鐜拌繃鐨勮瘽
                if (!t[i].bShow) {
                    distance = this._map.getDistance(new BMap.Point(t[i].lng, t[i].lat), markerPoi);
                    //涓ょ偣璺濈灏忎簬10绫筹紝璁や负鏄悓涓€涓偣
                    if (distance < 10) {
                        t[i].bShow = true;
                        return i;
                    }
                }
            }
            return -1;
        }
    });
    /**
     * 鑷畾涔夌殑overlay锛屾樉绀哄湪灏忚溅鐨勪笂鏂�
     * @param {Point} Point 瑕佸畾浣嶇殑鐐�.
     * @param {String} html overlay涓鏄剧ず鐨勪笢瑗�.
     * @return 鏃犺繑鍥炲€�.
     */
    function CustomOverlay(point,html) {
        this._point = point;
        this._html = html;
    }
    CustomOverlay.prototype = new BMap.Overlay();
    CustomOverlay.prototype.initialize = function(map) {
        var div = this._div = baidu.dom.create('div', {style: 'border:solid 1px #ccc;width:auto;min-width:50px;text-align:center;position:absolute;background:#fff;color:#000;font-size:12px;border-radius: 10px;padding:5px;white-space: nowrap;'});
        div.innerHTML = this._html;
        map.getPanes().floatPane.appendChild(div);
        this._map = map;
        return div;
    }
    CustomOverlay.prototype.draw = function() {
        this.setPosition(this.lushuMain._marker.getPosition(), this.lushuMain._marker.getIcon().size);
    }
    baidu.object.extend(CustomOverlay.prototype, {
        //璁剧疆overlay鐨刾osition
        setPosition: function(poi,markerSize) {
            // 姝ゅ鐨刡ug宸蹭慨澶嶏紝鎰熻阿 鑻楀啲(diligentcat@gmail.com) 鐨勭粏蹇冩煡鐪嬪拰璁ょ湡鎸囧嚭
            var px = this._map.pointToOverlayPixel(poi),
                styleW = baidu.dom.getStyle(this._div, 'width'),
                styleH = baidu.dom.getStyle(this._div, 'height');
            overlayW = parseInt(this._div.clientWidth || styleW, 10),
                overlayH = parseInt(this._div.clientHeight || styleH, 10);
            this._div.style.left = px.x - overlayW / 2 + 'px';
            this._div.style.bottom = -(px.y - markerSize.height) + 'px';
        },
        //璁剧疆overlay鐨勫唴瀹�
        setHtml: function(html) {
            this._div.innerHTML = html;
        },
        //璺焎ustomoverlay鐩稿叧鐨勫疄渚嬬殑寮曠敤
        setRelatedClass: function(lushuMain) {
            this.lushuMain = lushuMain;
        }
    });
})();
