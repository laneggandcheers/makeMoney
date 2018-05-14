!
function(e, t, n) {
	t.MGTOOL = {},
	e.extend(MGTOOL, {
		byteLength: function(e) {
			var t = e.match(/[^\x00-\x80]/g);
			return e.length + (t ? t.length: 0)
		},
		jsMbSubstr: function(e, t) {
			if (!e || !t) return "";
			var n = 0,
			o = 0,
			r = "",
			i = e.length;
			for (o = 0; i > o; o++) {
				if (n = e.charCodeAt(o) > 255 ? n += 2 : ++n, n > 2 * t) return r;
				r += e.charAt(o)
			}
			return e
		},
		formatMoney: function(e, t, n) {
			if (t = MGTOOL.empty(e) ? "2": t, MGTOOL.empty(n)) return e.toFixed(t);
			var o = 0 > e ? "-": "",
			r = parseInt(e = Math.abs( + e || 0).toFixed(t), 10) + "",
			i = (i = r.length) > 3 ? i % 3 : 0;
			return o + (i ? r.substr(0, i) + n: "") + r.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + n) + (t ? "." + Math.abs(e - r).toFixed(t).slice(2) : "")
		}
	}),
	e.extend(MGTOOL, {
		emptyObj: function(e) {
			for (var t in e) return ! 1;
			return ! 0
		},
		empty: function(e) {
			return null == e || 0 === e.length
		},
		objToJson: function(e) {
			return JSON.stringify(e)
		}
	}),
	e.extend(MGTOOL, {
		setCookie: function(e, t, n) {
			n = n || {},
			null === t && (t = "", n.expires = -1);
			var o = "";
			if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
				var r;
				"number" == typeof n.expires ? (r = new Date, r.setTime(r.getTime() + 864e5 * n.expires)) : r = n.expires,
				o = "; expires=" + r.toUTCString()
			}
			var i = n.path ? "; path=" + n.path: "",
			u = n.secure ? "; secure": "",
			a = "";
			n.domain ? a = "; domain=" + n.domain: (a = document.domain.toString().split("."), a = "; domain=." + a[1] + "." + a[2]),
			document.cookie = [e, "=", encodeURIComponent(t), o, i, a, u].join("")
		},
		getCookie: function(e) {
			var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
			return null !== t ? decodeURIComponent(t[2]) : ""
		},
		removeCookie: function(e) {
			MGTOOL.setCookie(e, null, {
				expires: -1
			})
		},
		setCacheCookie: function(t, n, o, r) {
			o = o || {},
			null === n && (n = "");
			var i = "undefined" == typeof r ? MGTOOL.getCookie("__mgjuuid") : r;
			e.ajax({
				url: "/collect/uedcookie",
				type: "POST",
				timeout: 6e4,
				data: {
					cookiename: t,
					uuid: i,
					type: "set",
					value: n,
					lifetime: 86400 * o.expires
				},
				dataType: "json",
				success: function(e) {
					"" === e && alert(MGLANG.msgTimeout)
				}
			})
		},
		getCacheCookie: function(t, n) {
			var o = "undefined" == typeof n ? MGTOOL.getCookie("__mgjuuid") : n,
			r = "";
			return e.ajax({
				url: "/collect/uedcookie",
				type: "POST",
				timeout: 6e4,
				async: !1,
				data: {
					cookiename: t,
					uuid: o,
					type: "get"
				},
				dataType: "json",
				success: function(e) {
					var t = e.status.code;
					e.status.msg;
					if (1001 == t) {
						var n = e.result.data.value;
						r = n
					} else alert(MGLANG.msgTimeout)
				}
			}),
			r
		}
	}),
	e.extend(MGTOOL, {
		getQueryString: function(e, t) {
			t = "undefined" != typeof t ? t: location.href;
			var n = new RegExp("(^|\\?|&)" + e + "=([^&]*)(\\s|&|$)", "i");
			return n.test(t) ? RegExp.$2.replace(/\+/g, " ") : ""
		},
		getPicExtension: function(e) {
			return /(.+)\.(.+)/.exec(e) ? RegExp.$2: ""
		},
		filterDomain: function(e) {
			var t = /http:\/\/[^\/]+/;
			return e.replace(t, "")
		}
	}),
	e.extend(MGTOOL, {
		throttleM: {
			isLoading: !1,
			throttoleXhr: function(e, t) {
				var n = this;
				if (!n.isLoading) {
					t = t || 500,
					n.isLoading = !0;
					var o = e();
					o.complete = function() {
						setTimeout(function() {
							n.isLoading = !1
						},
						t)
					}
				}
			}
		}
	}),
	e.extend(MGTOOL, {
		getMsgLength: function(e) {
			var t = e.length;
			if (t > 0) {
				for (var n = 41,
				o = 140,
				r = 24,
				i = e,
				u = e.match(/http[s]?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\/,:;@&=\?\~\#\%]*)*/gi) || [], a = 0, s = 0, c = u.length; c > s; s++) {
					var g = MGTOOL.byteLength(u[s]);
					/^(http:\/\/mogujie.cn)/.test(u[s]) || (a += /^(http:\/\/)+(mogujie.cn|mogujie.com)/.test(u[s]) && n >= g ? g: o >= g ? r: g - o + r, i = i.replace(u[s], ""))
				}
				return Math.ceil((a + MGTOOL.byteLength(i)) / 2)
			}
			return 0
		},
		getAbsoluteLocation: function(n) {
			if (1 !== arguments.length || null === n) return null;
			var o = e(n),
			r = o.offset(),
			i = r.top,
			u = r.left,
			a = o.height(),
			s = e(t).height(),
			c = e(document).scrollTop(),
			g = i >= c && c + s >= i,
			l = i + a + 200 >= c && c + s >= i - 400;
			return {
				absoluteTop: i,
				absoluteLeft: u,
				isInView: g,
				isLoad: l
			}
		},
		distance2Bottom: function(n) {
			var o = e(document),
			r = e(t),
			i = o.scrollTop(),
			u = r.height(),
			a = o.height();
			return i + u + n >= a
		},
		isParent: function(e, t) {
			for (; e !== n && null !== e && "BODY" != e.tagName.toUpperCase();) {
				if (e == t) return ! 0;
				e = e.parentNode
			}
			return ! 1
		},
		template: function(e, t) {
			return doT.template(e)(t)
		},
		log: function(e) {
			t.console !== n && console.log(e)
		},
		dataFormat: function(e, t) {
			var n = {
				"M+": e.getMonth() + 1,
				"d+": e.getDate(),
				"h+": e.getHours(),
				"m+": e.getMinutes(),
				"s+": e.getSeconds(),
				"q+": Math.floor((e.getMonth() + 3) / 3),
				S: e.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (var o in n) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[o] : ("00" + n[o]).substr(("" + n[o]).length)));
			return t
		}
	}),
	e.extend(MGTOOL, {
		trim: function(t) {
			return e.trim(t)
		},
		getRequest: function(e, t) {
			return this.getQueryString(e, t)
		}
	})
} (jQuery, window);
var MOGU = MOGU || {}; !
function(t) {
	MOGU.Globe_Textarea_Auto_Height = function(e) {
		var o = e.height(),
		i = function() {
			0 > o && (o = e.height()),
			(t.browser.mozilla || t.browser.safari) && e.height(o);
			var i = e[0].scrollHeight,
			n = o > i ? o: i;
			n = 1.5 * o > n ? o: i,
			e.height(n)
		};
		e.bind("keyup", i).bind("input", i).bind("propertychange", i).bind("focus", i)
	},
	MOGU.Globe_Goods_URL_Support = function(t) {
		var e = /item(.[\w]+)?.taobao.com\/(.?)[item.htm|item_num_id|item_detail|itemID|item_id|default_item_id]/i,
		o = /detail.tmall/i,
		i = /auction\d?.paipai.com/i,
		n = /buy.caomeipai.com\/goods/i,
		a = /www.360buy.com\/product/i,
		c = /product.dangdang.com\/Product.aspx\?product_id=/i,
		r = /book.360buy.com/i,
		s = /www.vancl.com\/StyleDetail/i,
		u = /www.vancl.com\/Product/i,
		l = /vt.vancl.com\/item/i,
		d = /item.vancl.com\/\d+/i,
		m = /item.vt.vancl.com\/\d+/i,
		w = /(mbaobao.com\/pshow)|(mbaobao.com\/item)/i,
		f = /item.buy.qq.com\/item/i,
		_ = /[www|us].topshop.com\/webapp\/wcs\/stores\/servlet\/ProductDisplay/i,
		b = /quwan.com\/goods/i,
		h = /nala.com.cn\/product/i,
		p = /maymay.cn\/pitem/i,
		v = /asos.com/i,
		g = /www.100f1.com\/ProductInfo_/i,
		y = /www.gaojie.com\/product/i,
		G = /a.m.taobao.com\/i/i,
		O = /www.51yugou.com\//i,
		M = /www.1mall.com\//i,
		U = /www.yihaodian.com\//i,
		k = /www.xipin.me\//i,
		j = /www.nuandao.com\//i,
		x = /www.rosebeauty.com.cn\//i,
		L = /www.hmeili.com\//i,
		T = /www.yueji.com\//i,
		C = /www.yougou.com\//i,
		S = /cn.shopbop.com\//i,
		I = /item.jd.com\//i,
		P = /[www|shop].mogujie.com(.*)\/detail/i;
		return e.test(t) || o.test(t) || r.test(t) || a.test(t) || i.test(t) || n.test(t) || c.test(t) || s.test(t) || u.test(t) || l.test(t) || d.test(t) || m.test(t) || w.test(t) || _.test(t) || b.test(t) || h.test(t) || p.test(t) || v.test(t) || g.test(t) || y.test(t) || f.test(t) || G.test(t) || O.test(t) || U.test(t) || k.test(t) || j.test(t) || x.test(t) || L.test(t) || T.test(t) || C.test(t) || M.test(t) || S.test(t) || I.test(t) || P.test(t)
	},
	MOGU.Globe_Input_Text = function(e, o) {
		o = o || e.val(),
		e.focus(function() {
			var e = t(this);
			t.trim(e.val()) == o && e.val(""),
			e.css("color", "#000")
		}),
		e.blur(function() {
			var e = t(this);
			"" == t.trim(e.val()) && (e.val(o), e.css("color", "#ccc"))
		})
	},
	MOGU.Globe_Input_Text_Hide = function(e) {
		e.focus(function() {
			var e = t(this);
			t.trim(e.val()) == t.trim(e.attr("def-v")) && e.val(""),
			e.css("color", "#000")
		}),
		e.blur(function() {
			var e = t(this);
			"" == t.trim(e.val()) && (e.val(e.attr("def-v")), e.css("color", "#ccc"))
		})
	},
	MOGU.WB_Word_Count = function(e, o, i) {
		var n = i ? i: 140;
		if (t("#" + e)[0]) {
			var a = function() {
				var i = 0;
				i = o ? MGTOOL.getMsgLength(t("#" + o).val()) : MGTOOL.getMsgLength(t("#" + e).find(".pub_txt").val());
				var a = n - i;
				0 == i ? t("#" + e).find(".word_count").html(n) : i > n ? (t("#" + e).find(".word_count_wrap").html('\u60a8\u5df2\u8d85\u8fc7<em class="word_count"></em>\u4e2a\u5b57').find(".word_count").html(Math.abs(a)), t("#" + e).find(".word_count_wrap").show(), t("#" + e).find(".word_count").addClass("out")) : (t("#" + e).find(".word_count_wrap").html('\u8fd8\u53ef\u4ee5\u8f93\u5165<em class="word_count"></em>\u4e2a\u5b57').find(".word_count").html(a), t("#" + e).find(".word_count").removeClass("out"))
			};
			o ? t("#" + o).bind("keyup", a).bind("input", a).bind("propertychange", a) : t("#" + e).find(".pub_txt").bind("keyup", a).bind("input", a).bind("propertychange", a)
		}
	},
	MOGU.Globe_Range_Input = function(t) {
		if (t[0].createTextRange) {
			var e = t[0].createTextRange();
			e.moveEnd("character", t.val().length),
			e.moveStart("character", t.val().length),
			e.select()
		} else t[0].setSelectionRange(t.val().length, t.val().length),
		t.focus()
	},
	MOGU.Globe_Check_Login = function() {
		return "" == MOGUPROFILE.userid ? (MOGU.user_handsome_login_init(), MOGU.user_handsome_login(), !1) : !0
	},
	MOGU.Globe_Short_Link_From = function() {
		t(".mg_slink").live("click",
		function() {
			var e = window.location.toString();
			if (! (e.indexOf("is_qzone=1") >= 0)) {
				var o = this,
				i = o.href,
				n = t(o).attr("s"),
				a = t(o).attr("c");
				"" == a && (a = MOGUPROFILE.userid);
				var c = i,
				r = "";
				r = -1 == i.indexOf("?") ? "?c=" + a + "&s=" + n: "&c=" + a + "&s=" + n,
				c += r,
				o.href = c,
				setTimeout(function() {
					o.href = i
				},
				500)
			}
		})
	},
	MOGU.Globe_Short_Link_From(),
	MOGU.Globe_Bind_Keybord_Submit = function(e, o, i) {
		i = i || "need_focus",
		"need_focus" == i && (e.focus(function() {
			t("body").unbind("keydown"),
			t("body").bind("keydown",
			function(t) {
				t.ctrlKey && 13 == t.keyCode && o.click()
			})
		}), e.blur(function() {
			t("body").unbind("keydown")
		})),
		"not_need_focus" == i && t(document).bind("keydown",
		function(e) {
			e.ctrlKey && 13 == e.keyCode && (o.click(), t("body").unbind("keydown"))
		})
	},
	MOGU.GLobe_GetObj_Length = function(t) {
		var e, o = 0;
		for (e in t) t.hasOwnProperty(e) && o++;
		return o
	},
	MOGU.Empty_Message_Tip = function(t) {
		var e = t ? t: {},
		o = e.pub_obj,
		i = null,
		n = 0;
		i = setInterval(function() {
			n++,
			6 == n ? (clearInterval(i), o.focus()) : n % 2 == 0 ? o.addClass("empty_tip") : o.removeClass("empty_tip")
		},
		120)
	},
	MOGU.Defult_Post_data = function(e) {
		if (e instanceof jQuery || (e = t(e)), e.hasClass("disable")) return ! 1;
		e.addClass("disable");
		var o = e.data(),
		i = o.url || "";
		if ("" !== i) {
			var n = function(t) {
				1001 === t.status.code ? window.location.reload() : alert(t.status.msg)
			};
			jQuery.ajax({
				url: i,
				type: "POST",
				dataType: "json",
				data: o,
				complete: function() {
					e.removeClass("disable")
				},
				success: function(t) {
					n(t)
				}
			})
		}
	},
	MOGU.Globe_Trace_Log = function(t) {},
	t.fn.serializeObject = function() {
		var e = {},
		o = this.serializeArray();
		return t.each(o,
		function() {
			void 0 !== e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
		}),
		e
	},
	MOGU.SerializeFormObject = function(t) {
		t.serializeObject()
	}
} (jQuery),
$(function() {
	$(document).off("click", ".__trace__").on("click", ".__trace__",
	function(t) {
		var e = $(this).attr("data-trace");
		e && MOGU.Globe_Trace_Log(e)
	})
}),
function() {
	for (var t, e = function() {},
	o = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], i = o.length, n = window.console = window.console || {}; i--;) t = o[i],
	n[t] || (n[t] = e)
} (); !
function(t) {
	MOGU.imgCodeCheck = function() {
		var a = !1,
		i = t(".img_code_spin");
		if (0 == i.length) return a = !0;
		for (var c = 0; c < i.length; c++) {
			var e = t(i[c]);
			if (0 != e.val()) {
				a = !0;
				break
			}
		}
		return a
	},
	MOGU.imgCaptchaInit = function() {
		var a = t(".imgcheck_image_div"),
		i = t("#imgcheck_code_change"),
		c = function(t, a) {
			var i = -75 * ((a + 1) % 4),
			c = t[0].style.backgroundPosition.split(" ");
			t[0].style.backgroundPosition = c[0] + " " + i + "px"
		};
		a.click(function() {
			var a = t(this).attr("f"),
			i = t("#img_code_spin_" + a),
			e = parseInt(i.val());
			c(t(this), e),
			i.val(e + 1)
		}),
		i.click(function() {
			MOGU.imgCaptchaRecaptcha()
		})
	},
	MOGU.imgCaptchaRecaptcha = function(a) {
		var i = function(a) {
			for (var i = t(".imgcheck_image_div"), c = i.length, e = 0; c > e; e++) {
				var n = i[e],
				o = n.getAttribute("f"),
				r = t("#img_code_spin_" + o);
				r.val(0);
				var u = t(n);
				u.css("background-image", "url(/captchaimg/" + a + ")"),
				u.css({
					"background-position": -75 * e + "px 0"
				})
			}
		};
		void 0 === a ? t.ajax({
			url: "/reimgcaptcha",
			type: "POST",
			timeout: 6e4,
			data: {},
			dataType: "json",
			cache: !1,
			success: function(t) {
				var a = t.status.code;
				t.status.msg;
				if (1001 == a) {
					var c = t.result.data.captchaId;
					i(c)
				}
			},
			error: function(t, a, i) {
				"timeout" == a && alert(MGLANG.msgTimeout)
			}
		}) : setTimeout(function() {
			i(a)
		},
		1)
	},
	MOGU.imgCaptchaInit()
} (jQuery); !
function(e) {
	function t(r) {
		if (n[r]) return n[r].exports;
		var i = n[r] = {
			exports: {},
			id: r,
			loaded: !1
		};
		return e[r].call(i.exports, i, i.exports, t),
		i.loaded = !0,
		i.exports
	}
	var n = {};
	return t.m = e,
	t.c = n,
	t.p = "",
	t(0)
} ([function(e, t, n) {
	function r(e) {
		return e = e || {},
		e.extra = e.extra || {},
		"e" === e.type ? p.constructTraceData(e) : "n" === e.type ? p.constructNetworkData(e) : e
	}
	var i = n(1),
	o = n(3),
	a = n(5),
	s = n(10),
	d = n(6),
	u = (n(9), n(2)),
	c = n(4),
	p = n(8),
	f = n(7);
	try {
		f.init(),
		d.init(),
		a.init(),
		s.init(),
		u.addEventListener(window, "load",
		function() {
			d.send(p.constructNetworkData({
				type: "n",
				url: u.formatUrl(location.href),
				responseCode: 200,
				responseSize: c.BLANK_VALUE,
				responseTime: o.getResponseTime(),
				bizCode: c.BLANK_VALUE,
				extra: {}
			})),
			d.send(p.constructTraceData({
				type: "e",
				extra: u.extend({
					performanceEvent: !0,
					eventid: c.eventidMap[i.getPlatform()]
				},
				i.getAll(), o.getOnload())
			}))
		})
	} catch(g) {}
	var l = {
		send: function(e) {
			d.send(r(e))
		},
		sendImmediately: function() {
			d.sendImmediately(r(data))
		}
	};
	window._trace || (window._trace = l),
	window.Mogu && window.Mogu.util && (window.Mogu.util.trace = l)
},
function(e, t, n) {
	function r() {
		var e = navigator.appVersion;
		return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(e) ? "h5": "pc"
	}
	function i() {
		var e, t, n = (navigator.appVersion, navigator.userAgent),
		r = "\u5176\u5b83",
		i = r,
		o = "",
		a = "";
		return - 1 != (e = n.indexOf("Opera")) && (i = "Opera", o = n.substring(e + 6), -1 != (e = n.indexOf("Version")) && (o = n.substring(e + 8))),
		-1 != (e = n.indexOf("OPR")) ? (i = "Opera", o = n.substring(e + 4)) : -1 != (e = n.indexOf("MSIE")) ? (i = "IE", o = n.substring(e + 5)) : -1 != (e = n.indexOf("Chrome")) ? (i = "Chrome", o = n.substring(e + 7)) : -1 != (e = n.indexOf("Safari")) ? (i = "Safari", o = n.substring(e + 7), -1 != (e = n.indexOf("Version")) && (o = n.substring(e + 8))) : -1 != (e = n.indexOf("Firefox")) ? (i = "Firefox", o = n.substring(e + 8)) : -1 != n.indexOf("Trident/") ? (i = "IE", o = n.substring(n.indexOf("rv:") + 3)) : -1 != n.toLowerCase().indexOf("mogujie") ? i = "Mogujie": -1 != n.indexOf("MicroMessenger") ? i = "Wechat": -1 != n.indexOf("QQ") ? i = "QQ": -1 != n.indexOf("Weibo") ? i = "Weibo": -1 != n.indexOf("baiduboxapp") && (i = "Baidu"),
		-1 != (t = o.indexOf(";")) && (o = o.substring(0, t)),
		-1 != (t = o.indexOf(" ")) && (o = o.substring(0, t)),
		-1 != (t = o.indexOf(")")) && (o = o.substring(0, t)),
		o && (a = parseInt("" + o, 10), isNaN(a) && (o = "" + parseFloat(navigator.appVersion), a = parseInt(navigator.appVersion, 10))),
		a ? i + "_" + a: i
	}
	function o() {
		var e = "\u5176\u5b83",
		t = e,
		n = navigator.userAgent,
		r = navigator.appVersion,
		i = [{
			s: "Windows 10",
			r: /(Windows 10.0|Windows NT 10.0)/
		},
		{
			s: "Windows 8.1",
			r: /(Windows 8.1|Windows NT 6.3)/
		},
		{
			s: "Windows 8",
			r: /(Windows 8|Windows NT 6.2)/
		},
		{
			s: "Windows 7",
			r: /(Windows 7|Windows NT 6.1)/
		},
		{
			s: "Windows Vista",
			r: /Windows NT 6.0/
		},
		{
			s: "Windows Server 2003",
			r: /Windows NT 5.2/
		},
		{
			s: "Windows XP",
			r: /(Windows NT 5.1|Windows XP)/
		},
		{
			s: "Windows 2000",
			r: /(Windows NT 5.0|Windows 2000)/
		},
		{
			s: "Windows ME",
			r: /(Win 9x 4.90|Windows ME)/
		},
		{
			s: "Windows 98",
			r: /(Windows 98|Win98)/
		},
		{
			s: "Windows 95",
			r: /(Windows 95|Win95|Windows_95)/
		},
		{
			s: "Windows NT 4.0",
			r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
		},
		{
			s: "Windows CE",
			r: /Windows CE/
		},
		{
			s: "Windows 3.11",
			r: /Win16/
		},
		{
			s: "Android",
			r: /Android/
		},
		{
			s: "Open BSD",
			r: /OpenBSD/
		},
		{
			s: "Sun OS",
			r: /SunOS/
		},
		{
			s: "Linux",
			r: /(Linux|X11)/
		},
		{
			s: "iOS",
			r: /(iPhone|iPad|iPod)/
		},
		{
			s: "Mac OS X",
			r: /Mac OS X/
		},
		{
			s: "Mac OS",
			r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
		},
		{
			s: "QNX",
			r: /QNX/
		},
		{
			s: "UNIX",
			r: /UNIX/
		},
		{
			s: "BeOS",
			r: /BeOS/
		},
		{
			s: "OS/2",
			r: /OS\/2/
		},
		{
			s: "Search Bot",
			r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
		}];
		for (var o in i) {
			var a = i[o];
			if (a.r.test(n)) {
				t = a.s;
				break
			}
		}
		var s = e;
		switch (/Windows/.test(t) && (s = /Windows (.*)/.exec(t)[1], t = "Windows"), t) {
		case "Mac OS X":
			s = "";
			break;
		case "Android":
			var d = (/Android ([\.\_\d]+)/.exec(n)[1] || "").split(".").slice(0, 2);
			s = d.join(".");
			break;
		case "iOS":
			s = /OS (\d+)_(\d+)_?(\d+)?/.exec(r),
			s = s[1] + "." + s[2]
		}
		return t === e ? t: t + s
	}
	function a() {
		var e = "";
		return screen.width && (width = screen.width ? screen.width: "", height = screen.height ? screen.height: "", e += "" + width + "x" + height),
		e
	}
	function s() {
		var e = (window.devicePixelRatio ? window.devicePixelRatio: 1) - 0;
		return e.toFixed(1)
	}
	function d() {
		return window.navigator.userAgent
	}
	function u() {
		var e = d();
		return e.indexOf("Crosswalk") > -1
	}
	n(2),
	window;
	e.exports = {
		getPlatform: r,
		getScreen: a,
		getOs: o,
		getBrowser: i,
		getUa: d,
		getDevicePixelRatio: s,
		getAll: function() {
			return {
				platform: r(),
				screen: a(),
				os: o(),
				browser: i(),
				devicePixelRatio: s(),
				isXwalk: u()
			}
		}
	}
},
function(e, t) {
	var n = 0;
	e.exports = {
		formatData: function(e) {
			return ("" + e).replace(/\./gim, "_")
		},
		formatUrl: function(e) {
			return "string" == typeof e && (e = e.split("?")[0].split("https://").join("").split("http://").join(""), "/" === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1))),
			e
		},
		getIEVersion: function() {
			var e = -1;
			if ("Microsoft Internet Explorer" == navigator.appName) {
				var t = navigator.userAgent,
				n = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
				null != n.exec(t) && (e = parseFloat(RegExp.$1))
			} else if ("Netscape" == navigator.appName) {
				var t = navigator.userAgent,
				n = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
				null != n.exec(t) && (e = parseFloat(RegExp.$1))
			}
			return e
		},
		getUniqId: function() {
			return "_traceId_" + n++
		},
		post: function(e, t) {
			t = t || {};
			var n, r = this.getUniqId();
			try {
				n = document.createElement('<iframe name="' + r + '">')
			} catch(i) {
				n = document.createElement("iframe"),
				n.setAttribute("name", r)
			}
			try {
				n.style.display = "none";
				var o = document.createElement("form");
				o.setAttribute("method", "POST"),
				o.setAttribute("action", e),
				o.setAttribute("target", r);
				for (var a in t) if (t.hasOwnProperty(a)) {
					var s = document.createElement("input");
					s.setAttribute("type", "hidden"),
					s.setAttribute("name", a),
					s.setAttribute("value", t[a]),
					o.appendChild(s)
				}
				document.body.appendChild(o),
				document.body.appendChild(n),
				this.addEventListener(n, "load",
				function() {
					try {
						document.body.removeChild(o),
						document.body.removeChild(n)
					} catch(e) {}
				}),
				o.submit()
			} catch(i) {}
		},
		waitFor$: function(e) {
			return window.$ ? void e() : void setTimeout(function() {
				this.waitFor$(e)
			},
			50)
		},
		addEventListener: function(e, t, n) {
			e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
		},
		extend: function() {
			for (var e = arguments,
			t = arguments[0], n = 1; n < e.length; n++) {
				var r = e[n];
				for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i])
			}
			return t
		},
		trim: function(e) {
			var t = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
			return String(e).replace(t, "")
		},
		getMsExactMin: function() {
			var e = (new Date).getTime();
			return e - e % 6e4
		},
		stringify: function(e) {
			var t = typeof e;
			if ("object" != t || null === e) return "string" == t && (e = '"' + e + '"'),
			String(e);
			var n, r, i = [],
			o = e && e.constructor == Array;
			for (n in e) r = e[n],
			t = typeof r,
			e.hasOwnProperty(n) && ("string" == t ? r = '"' + r + '"': "object" == t && null !== r && (r = jQuery.stringify(r)), i.push((o ? "": '"' + n + '":') + String(r)));
			return (o ? "[": "{") + String(i) + (o ? "]": "}")
		}
	}
},
function(e, t, n) {
	function r() {
		return window.performance && window.performance.timing ? s.responseEnd - s.requestStart: a.BLANK_VALUE
	}
	function i() {
		if (!s) return {};
		for (var e = {
			dns: s.domainLookupEnd - s.domainLookupStart,
			tcp: s.connectEnd - s.connectStart,
			request: s.responseStart - s.requestStart,
			response: s.responseEnd - s.responseStart,
			domContentLoad: s.domContentLoadedEventEnd - s.domContentLoadedEventStart,
			blankTime: (window.__trace__headendt || 0) - s.domainLookupStart,
			readyTime: s.domInteractive - s.domainLookupStart,
			onloadTime: s.domComplete - s.domainLookupStart,
			os: o.getOs(),
			browser: o.getBrowser()
		},
		t = ["dns", "tcp", "request", "response", "domContentLoad", "loadEvent", "blankTime", "readyTime", "onloadTime"], n = 0; n < t.length; n++) if (e[t[n]] < 0) return {};
		return e
	}
	var o = n(1),
	a = n(4),
	s = window.performance && window.performance.timing ? window.performance.timing: null;
	e.exports = {
		getOnload: i,
		getResponseTime: r
	}
},
function(e, t) {
	e.exports = {
		URL: "http://log.juangua.com/mlogs.php",
		APPID: 30,
		BLANK_VALUE: "",
		LOCALSTORAGE_KEY: "__trace__queue",
		LOCALSTORAGE_MAXLENGTH: 3,
		COOL_DOWN: 5e3,
		eventidMap: {
			h5Performance: 50003,
			pcPerformance: 50004,
			jserror: 50005
		},
		abbreviation: {}
	}
},
function(e, t, n) {
	function r(e, t, n, r) {
		for (var i = !0,
		o = 0; o < d.length; o++) {
			var a = d[o] || {};
			if (a.msg === e && a.file === t && a.line === n && a["char"] === r) {
				i = !1;
				break
			}
		}
		return i
	}
	var i = (document, n(4), n(6)),
	o = n(8),
	a = n(1),
	s = n(2),
	d = [];
	e.exports = {
		init: function() {
			window.onerror = function(e, t, n, u) {
				r(e, t, n, u) && (d.push({
					msg: e,
					file: t,
					line: n,
					"char": u
				}), i.send(o.constructTraceData({
					type: "e",
					extra: s.extend({
						msg: e,
						file: t,
						line: n,
						"char": u
					},
					a.getAll())
				})))
			}
		}
	}
},
function(e, t, n) {
	function r(e) {
		var t, n = {
			v: 3
		};
		return t = "n" === e[0].type || "s" === e[0].type ? "network": "data",
		n[t] = i(e),
		n
	}
	function i(e) {
		e = e || [];
		for (var t = "	",
		n = "\n",
		r = [], i = 0; i < e.length; i++) {
			var o = e[i] || {};
			if (o = o || {},
			o.extra) {
				o.extra.performanceEvent && delete o.extra.performanceEvent;
				var a = window.JSON ? JSON.stringify: u.stringify;
				o.extra = a(o.extra)
			}
			var s = [];
			"n" === o.type || "s" === o.type ? s = ["appid", "type", "did", "startTime", "url", "responseCode", "responseTime", "time", "fixTime", "requestSize", "responseSize", "bizCode", "extra"] : "e" === o.type && (s = ["appid", "type", "did", "startTime", "uid", "referrer", "url", "time", "fixTime", "extra"]);
			for (var d = [], c = 0; c < s.length; c++) d.push(o[s[c]]);
			r.push(d.join(t))
		}
		return r.join(n)
	}
	function o(e) {
		return "e" === e.type && e.extra.performanceEvent
	}
	function a(e) {
		var t = (new Date).getTime();
		t - p > c.COOL_DOWN && (u.post(c.URL, e), p = t)
	}
	function s() {
		setTimeout(function() {
			d.isReadyPost() && a(r(d.shift())),
			s()
		},
		c.COOL_DOWN)
	}
	var d = n(7),
	u = n(2),
	c = n(4),
	p = 0;
	e.exports = {
		send: function(e) {
			if (e = e || {},
			e.extra = e.extra || {},
			"n" !== e.type && !o(e)) return void u.post(c.URL, r([e]));
			var t = d.push(e);
			t || u.post(c.URL, r([e])),
			"n" !== e.type && d.isReadyPost() && a(r(d.shift()))
		},
		sendImmediately: function(e) {
			e = e || {},
			e.extra = e.extra || {},
			u.post(c.URL, r([e]))
		},
		init: function() {
			s()
		}
	}
},
function(e, t, n) {
	function r() {
		return {
			event: [],
			network: []
		}
	}
	var i = {
		e: "event",
		n: "network",
		s: "network"
	},
	o = n(4),
	a = n(2);
	e.exports = {
		support: !(!window.localStorage || !window.JSON || "function" != typeof localStorage.getItem || "function" != typeof localStorage.setItem || 11 == a.getIEVersion()),
		init: function() {
			this.support && this.getStorage()
		},
		push: function(e) {
			if (!this.support) return ! 1;
			var t = this.getStorage() || r(),
			n = i[e.type];
			return n ? (t[n].push(e), this.setStorage(t), t) : !1
		},
		shift: function(e) {
			if (!this.support) return ! 1;
			e = e || o.LOCALSTORAGE_MAXLENGTH;
			var t, n = this.getStorage();
			if (n.event.length >= e) t = "event";
			else {
				if (! (n.network.length >= e)) return ! 1;
				t = "network"
			}
			var r = n[t].slice(0, e);
			return n[t] = n[t].slice(e),
			this.setStorage(n),
			r
		},
		isReadyPost: function() {
			if (!this.support) return ! 1;
			var e = this.getStorage();
			return e.event.length > o.LOCALSTORAGE_MAXLENGTH || e.network.length > o.LOCALSTORAGE_MAXLENGTH
		},
		getStorage: function() {
			try {
				var e = JSON.parse(localStorage.getItem(o.LOCALSTORAGE_KEY))
			} catch(t) {
				e = r(),
				this.setStorage(e)
			}
			return e || (e = r(), this.setStorage(e)),
			e
		},
		setStorage: function(e) {
			try {
				localStorage.setItem(o.LOCALSTORAGE_KEY, JSON.stringify(e))
			} catch(t) {
				return ! 1
			}
		}
	}
},
function(e, t, n) {
	var r = n(4),
	i = n(9),
	o = n(2);
	e.exports = {
		constructTraceData: function(e) {
			e = e || {},
			e.extra = e.extra || {},
			e.extra.pageUrl = o.formatUrl(location.href);
			var t = Math.ceil(o.getMsExactMin() / 1e3);
			return e = o.extend({
				appid: i.getAppid(),
				did: i.getDid(),
				startTime: t,
				uid: i.getUid(),
				referrer: document.referrer,
				url: o.formatUrl(location.href),
				time: t,
				fixTime: t
			},
			e)
		},
		constructNetworkData: function(e) {
			e = e || {},
			e.extra = e.extra || {},
			e.extra.pageUrl = o.formatUrl(location.href);
			var t = Math.ceil(o.getMsExactMin() / 1e3);
			return e = o.extend({
				appid: i.getAppid(),
				did: i.getDid(),
				startTime: t,
				time: t,
				fixTime: r.BLANK_VALUE,
				requestSize: t
			},
			e)
		}
	}
},
function(e, t, n) {
	var r = n(4),
	i = n(2);
	e.exports = {
		getUid: function() {
			var e = this._getCookie() || {};
			return e.__ud || r.BLANK_VALUE
		},
		getDid: function() {
			var e = this._getCookie() || {};
			return e.__mgjuuid || r.BLANK_VALUE
		},
		getAppid: function() {
			return r.APPID
		},
		_getCookie: function() {
			for (var e = document.cookie || "",
			t = e.split(";"), n = {},
			r = 0; r < t.length; r++) {
				var o = i.trim(t[r] || ""),
				a = o.split("=");
				n[a[0]] = a[1]
			}
			return n
		}
	}
},
function(e, t, n) {
	var r = n(2),
	i = n(6),
	o = n(8),
	a = n(4);
	e.exports = {
		init: function() {
			var e = $.ajax;
			$.ajax = function() {
				var t = (new Date).getTime(),
				n = e.apply(this, arguments);
				try {
					var s, d = !1;
					"string" == typeof arguments[0] ? (s = r.formatUrl(arguments[0]), arguments[1] && "[object Object]" === Object.prototype.toString.call(arguments[1]) && "jsonp" === arguments[1].dataType && (d = !0)) : "object" == typeof arguments[0] && (s = r.formatUrl(arguments[0].url || ""), "jsonp" === arguments[0].dataType && (d = !0)),
					n.always(function(e) {
						if (!d) {
							var r = n.getAllResponseHeaders() || "",
							u = /content\-length\:\s(\d*)/m,
							c = 0,
							p = u.exec(r);
							p && p[1] && (c = $.trim(p[1]) || "");
							var f;
							"[object Object]" === Object.prototype.toString.call(e) && e.status && (f = e.status.code),
							i.send(o.constructNetworkData({
								type: "n",
								url: s,
								responseCode: n.status,
								responseSize: c,
								responseTime: (new Date).getTime() - t,
								bizCode: f || a.BLANK_VALUE,
								extra: {
									isAjax: 1
								}
							}))
						}
					})
				} catch(u) {}
				return n
			}
		}
	}
}]);
