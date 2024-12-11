;(function ($) {
  typeof define == 'function' && define.amd ? define($) : $()
})(function () {
  'use strict'
  function $ () {}
  function ue (t) {
    return t()
  }
  function de () {
    return Object.create(null)
  }
  function U (t) {
    t.forEach(ue)
  }
  function $e (t) {
    return typeof t == 'function'
  }
  function le (t, e) {
    return t != t
      ? e == e
      : t !== e || (t && typeof t == 'object') || typeof t == 'function'
  }
  function xe (t) {
    return Object.keys(t).length === 0
  }
  function d (t, e) {
    t.appendChild(e)
  }
  function T (t, e, r) {
    t.insertBefore(e, r || null)
  }
  function I (t) {
    t.parentNode.removeChild(t)
  }
  function Pe (t, e) {
    for (let r = 0; r < t.length; r += 1) t[r] && t[r].d(e)
  }
  function w (t) {
    return document.createElement(t)
  }
  function x (t) {
    return document.createTextNode(t)
  }
  function R () {
    return x(' ')
  }
  function Y () {
    return x('')
  }
  function F (t, e, r, n) {
    return t.addEventListener(e, r, n), () => t.removeEventListener(e, r, n)
  }
  function p (t, e, r) {
    r == null
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== r && t.setAttribute(e, r)
  }
  function Ue (t) {
    return Array.from(t.childNodes)
  }
  function X (t, e) {
    ;(e = '' + e), t.wholeText !== e && (t.data = e)
  }
  function D (t, e) {
    t.value = e == null ? '' : e
  }
  function q (t, e, r) {
    t.classList[r ? 'add' : 'remove'](e)
  }
  let K
  function B (t) {
    K = t
  }
  function oe () {
    if (!K) throw new Error('Function called outside component initialization')
    return K
  }
  function me (t) {
    oe().$$.on_mount.push(t)
  }
  function Z (t, e) {
    return oe().$$.context.set(t, e), e
  }
  function W (t) {
    return oe().$$.context.get(t)
  }
  const G = [],
    pe = [],
    ee = [],
    _e = [],
    Fe = Promise.resolve()
  let ie = !1
  function De () {
    ie || ((ie = !0), Fe.then(he))
  }
  function se (t) {
    ee.push(t)
  }
  const ae = new Set()
  let te = 0
  function he () {
    const t = K
    do {
      for (; te < G.length; ) {
        const e = G[te]
        te++, B(e), He(e.$$)
      }
      for (B(null), G.length = 0, te = 0; pe.length; ) pe.pop()()
      for (let e = 0; e < ee.length; e += 1) {
        const r = ee[e]
        ae.has(r) || (ae.add(r), r())
      }
      ee.length = 0
    } while (G.length)
    for (; _e.length; ) _e.pop()()
    ;(ie = !1), ae.clear(), B(t)
  }
  function He (t) {
    if (t.fragment !== null) {
      t.update(), U(t.before_update)
      const e = t.dirty
      ;(t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(se)
    }
  }
  const ne = new Set()
  let P
  function H () {
    P = { r: 0, c: [], p: P }
  }
  function J () {
    P.r || U(P.c), (P = P.p)
  }
  function O (t, e) {
    t && t.i && (ne.delete(t), t.i(e))
  }
  function j (t, e, r, n) {
    if (t && t.o) {
      if (ne.has(t)) return
      ne.add(t),
        P.c.push(() => {
          ne.delete(t), n && (r && t.d(1), n())
        }),
        t.o(e)
    } else n && n()
  }
  function ge (t, e) {
    j(t, 1, 1, () => {
      e.delete(t.key)
    })
  }
  function be (t, e, r, n, l, i, a, c, s, o, f, u) {
    let v = t.length,
      k = i.length,
      g = v
    const b = {}
    for (; g--; ) b[t[g].key] = g
    const m = [],
      L = new Map(),
      M = new Map()
    for (g = k; g--; ) {
      const _ = u(l, i, g),
        S = r(_)
      let h = a.get(S)
      h ? n && h.p(_, e) : ((h = o(S, _)), h.c()),
        L.set(S, (m[g] = h)),
        S in b && M.set(S, Math.abs(g - b[S]))
    }
    const E = new Set(),
      C = new Set()
    function N (_) {
      O(_, 1), _.m(c, f), a.set(_.key, _), (f = _.first), k--
    }
    for (; v && k; ) {
      const _ = m[k - 1],
        S = t[v - 1],
        h = _.key,
        y = S.key
      _ === S
        ? ((f = _.first), v--, k--)
        : L.has(y)
        ? !a.has(h) || E.has(h)
          ? N(_)
          : C.has(y)
          ? v--
          : M.get(h) > M.get(y)
          ? (C.add(h), N(_))
          : (E.add(y), v--)
        : (s(S, a), v--)
    }
    for (; v--; ) {
      const _ = t[v]
      L.has(_.key) || s(_, a)
    }
    for (; k; ) N(m[k - 1])
    return m
  }
  function re (t) {
    t && t.c()
  }
  function Q (t, e, r, n) {
    const { fragment: l, on_mount: i, on_destroy: a, after_update: c } = t.$$
    l && l.m(e, r),
      n ||
        se(() => {
          const s = i.map(ue).filter($e)
          a ? a.push(...s) : U(s), (t.$$.on_mount = [])
        }),
      c.forEach(se)
  }
  function V (t, e) {
    const r = t.$$
    r.fragment !== null &&
      (U(r.on_destroy),
      r.fragment && r.fragment.d(e),
      (r.on_destroy = r.fragment = null),
      (r.ctx = []))
  }
  function Je (t, e) {
    t.$$.dirty[0] === -1 && (G.push(t), De(), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31)
  }
  function ce (t, e, r, n, l, i, a, c = [-1]) {
    const s = K
    B(t)
    const o = (t.$$ = {
      fragment: null,
      ctx: null,
      props: i,
      update: $,
      not_equal: l,
      bound: de(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(e.context || (s ? s.$$.context : [])),
      callbacks: de(),
      dirty: c,
      skip_bound: !1,
      root: e.target || s.$$.root
    })
    a && a(o.root)
    let f = !1
    if (
      ((o.ctx = r
        ? r(t, e.props || {}, (u, v, ...k) => {
            const g = k.length ? k[0] : v
            return (
              o.ctx &&
                l(o.ctx[u], (o.ctx[u] = g)) &&
                (!o.skip_bound && o.bound[u] && o.bound[u](g), f && Je(t, u)),
              v
            )
          })
        : []),
      o.update(),
      (f = !0),
      U(o.before_update),
      (o.fragment = n ? n(o.ctx) : !1),
      e.target)
    ) {
      if (e.hydrate) {
        const u = Ue(e.target)
        o.fragment && o.fragment.l(u), u.forEach(I)
      } else o.fragment && o.fragment.c()
      e.intro && O(t.$$.fragment),
        Q(t, e.target, e.anchor, e.customElement),
        he()
    }
    B(s)
  }
  class fe {
    $destroy () {
      V(this, 1), (this.$destroy = $)
    }
    $on (e, r) {
      const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = [])
      return (
        n.push(r),
        () => {
          const l = n.indexOf(r)
          l !== -1 && n.splice(l, 1)
        }
      )
    }
    $set (e) {
      this.$$set &&
        !xe(e) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1))
    }
  }
  var rt = '',
    Ye = (function t (e) {
      function r (l, i, a) {
        var c,
          s = {}
        if (Array.isArray(l)) return l.concat(i)
        for (c in l) s[a ? c.toLowerCase() : c] = l[c]
        for (c in i) {
          var o = a ? c.toLowerCase() : c,
            f = i[c]
          s[o] =
            o in s && typeof f == 'object' ? r(s[o], f, o === 'headers') : f
        }
        return s
      }
      function n (l, i, a, c) {
        typeof l != 'string' && (l = (i = l).url)
        var s = { config: i },
          o = r(e, i),
          f = {},
          u = c || o.data
        ;(o.transformRequest || []).map(function (g) {
          u = g(u, o.headers) || u
        }),
          u &&
            typeof u == 'object' &&
            typeof u.append != 'function' &&
            ((u = JSON.stringify(u)), (f['content-type'] = 'application/json'))
        var v =
          typeof document != 'undefined' &&
          document.cookie.match(
            RegExp('(^|; )' + o.xsrfCookieName + '=([^;]*)')
          )
        if (
          (v && (f[o.xsrfHeaderName] = v[2]),
          o.auth && (f.authorization = o.auth),
          o.baseURL &&
            (l = l.replace(/^(?!.*\/\/)\/?(.*)$/, o.baseURL + '/$1')),
          o.params)
        ) {
          var k = ~l.indexOf('?') ? '&' : '?'
          l +=
            k +
            (o.paramsSerializer
              ? o.paramsSerializer(o.params)
              : new URLSearchParams(o.params))
        }
        return (o.fetch || fetch)(l, {
          method: a || o.method,
          body: u,
          headers: r(o.headers, f, !0),
          credentials: o.withCredentials ? 'include' : 'same-origin'
        }).then(function (g) {
          for (var b in g) typeof g[b] != 'function' && (s[b] = g[b])
          var m = o.validateStatus ? o.validateStatus(g.status) : g.ok
          return o.responseType == 'stream'
            ? ((s.data = g.body), s)
            : g[o.responseType || 'text']()
                .then(function (L) {
                  ;(s.data = L), (s.data = JSON.parse(L))
                })
                .catch(Object)
                .then(function () {
                  return m ? s : Promise.reject(s)
                })
        })
      }
      return (
        (e = e || {}),
        (n.request = n),
        (n.get = function (l, i) {
          return n(l, i, 'get')
        }),
        (n.delete = function (l, i) {
          return n(l, i, 'delete')
        }),
        (n.head = function (l, i) {
          return n(l, i, 'head')
        }),
        (n.options = function (l, i) {
          return n(l, i, 'options')
        }),
        (n.post = function (l, i, a) {
          return n(l, a, 'post', i)
        }),
        (n.put = function (l, i, a) {
          return n(l, a, 'put', i)
        }),
        (n.patch = function (l, i, a) {
          return n(l, a, 'patch', i)
        }),
        (n.all = Promise.all.bind(Promise)),
        (n.spread = function (l) {
          return function (i) {
            return l.apply(this, i)
          }
        }),
        (n.CancelToken =
          typeof AbortController == 'function' ? AbortController : Object),
        (n.defaults = e),
        (n.create = t),
        n
      )
    })(),
    ye = {
      powered_by: 'Comments powered by Cusdis',
      post_comment: 'Comment',
      loading: 'Loading',
      email: 'Email (optional)',
      nickname: 'Nickname',
      reply_placeholder: 'Reply...',
      reply_btn: 'Reply',
      sending: 'sending...',
      mod_badge: 'MOD',
      content_is_required: 'Content is required',
      nickname_is_required: 'Nickname is required',
      comment_has_been_sent:
        'Your comment has been sent. Please wait for approval.'
    }
  function A (t) {
    const r = window['CUSDIS_LOCALE'] || ye,
      n = r[t] || ye[t]
    return (
      r[t] ||
        console.warn(
          '[cusdis]',
          'translation of language key',
          `'${t}'`,
          'is missing.'
        ),
      n
    )
  }
  function Ke (t) {
    let e,
      r,
      n,
      l,
      i,
      a,
      c,
      s,
      o,
      f,
      u,
      v,
      k,
      g,
      b,
      m,
      L,
      M,
      E,
      C = (t[3] ? A('sending') : A('post_comment')) + '',
      N,
      _,
      S
    return {
      c () {
        ;(e = w('div')),
          (r = w('div')),
          (n = w('div')),
          (l = w('label')),
          (l.textContent = `${A('nickname')}`),
          (i = R()),
          (a = w('input')),
          (c = R()),
          (s = w('div')),
          (o = w('label')),
          (o.textContent = `${A('email')}`),
          (f = R()),
          (u = w('input')),
          (v = R()),
          (k = w('div')),
          (g = w('label')),
          (g.textContent = `${A('reply_placeholder')}`),
          (b = R()),
          (m = w('textarea')),
          (L = R()),
          (M = w('div')),
          (E = w('button')),
          (N = x(C)),
          p(l, 'class', 'mb-2 block dark:text-gray-200'),
          p(l, 'for', 'nickname'),
          p(a, 'name', 'nickname'),
          p(
            a,
            'class',
            'w-full p-2 border border-gray-200 bg-transparent dark:text-gray-100 dark:outline-none'
          ),
          p(a, 'type', 'text'),
          p(a, 'title', A('nickname')),
          p(n, 'class', 'px-1'),
          p(o, 'class', 'mb-2 block dark:text-gray-200'),
          p(o, 'for', 'email'),
          p(u, 'name', 'email'),
          p(
            u,
            'class',
            'w-full p-2 border border-gray-200 bg-transparent dark:text-gray-100 dark:outline-none'
          ),
          p(u, 'type', 'email'),
          p(u, 'title', A('email')),
          p(s, 'class', 'px-1'),
          p(r, 'class', 'grid grid-cols-2 gap-4'),
          p(g, 'class', 'mb-2 block dark:text-gray-200'),
          p(g, 'for', 'reply_content'),
          p(m, 'name', 'reply_content'),
          p(
            m,
            'class',
            'w-full p-2 border border-gray-200 h-24 bg-transparent dark:text-gray-100 dark:outline-none'
          ),
          p(m, 'title', A('reply_placeholder')),
          p(k, 'class', 'px-1'),
          p(
            E,
            'class',
            'text-sm bg-gray-200 p-2 px-4 font-bold dark:bg-transparent dark:border dark:border-gray-100'
          ),
          q(E, 'cusdis-disabled', t[3]),
          p(M, 'class', 'px-1'),
          p(e, 'class', 'grid grid-cols-1 gap-4')
      },
      m (h, y) {
        T(h, e, y),
          d(e, r),
          d(r, n),
          d(n, l),
          d(n, i),
          d(n, a),
          D(a, t[1]),
          d(r, c),
          d(r, s),
          d(s, o),
          d(s, f),
          d(s, u),
          D(u, t[2]),
          d(e, v),
          d(e, k),
          d(k, g),
          d(k, b),
          d(k, m),
          D(m, t[0]),
          d(e, L),
          d(e, M),
          d(M, E),
          d(E, N),
          _ ||
            ((S = [
              F(a, 'input', t[7]),
              F(u, 'input', t[8]),
              F(m, 'input', t[9]),
              F(E, 'click', t[4])
            ]),
            (_ = !0))
      },
      p (h, [y]) {
        y & 2 && a.value !== h[1] && D(a, h[1]),
          y & 4 && u.value !== h[2] && D(u, h[2]),
          y & 1 && D(m, h[0]),
          y & 8 &&
            C !== (C = (h[3] ? A('sending') : A('post_comment')) + '') &&
            X(N, C),
          y & 8 && q(E, 'cusdis-disabled', h[3])
      },
      i: $,
      o: $,
      d (h) {
        h && I(e), (_ = !1), U(S)
      }
    }
  }
  function Be (t, e, r) {
    let { parentId: n } = e,
      l = '',
      i = '',
      a = '',
      c = !1,
      { onSuccess: s } = e
    const o = W('api'),
      f = W('setMessage'),
      { appId: u, pageId: v, pageUrl: k, pageTitle: g } = W('attrs'),
      b = W('refresh')
    async function m () {
      if (!l) {
        alert(A('content_is_required'))
        return
      }
      if (!i) {
        alert(A('nickname_is_required'))
        return
      }
      try {
        r(3, (c = !0))
        const N = await o.post('/api/open/comments', {
          appId: u,
          pageId: v,
          content: l,
          nickname: i,
          email: a,
          parentId: n,
          pageUrl: k,
          pageTitle: g
        })
        await b(), L(), f(A('comment_has_been_sent'))
      } finally {
        r(3, (c = !1))
      }
    }
    function L () {
      r(0, (l = '')), r(1, (i = '')), r(2, (a = '')), s && s()
    }
    function M () {
      ;(i = this.value), r(1, i)
    }
    function E () {
      ;(a = this.value), r(2, a)
    }
    function C () {
      ;(l = this.value), r(0, l)
    }
    return (
      (t.$$set = N => {
        'parentId' in N && r(5, (n = N.parentId)),
          'onSuccess' in N && r(6, (s = N.onSuccess))
      }),
      [l, i, a, c, m, n, s, M, E, C]
    )
  }
  class ke extends fe {
    constructor (e) {
      super(), ce(this, e, Be, Ke, le, { parentId: 5, onSuccess: 6 })
    }
  }
  function we (t, e, r) {
    const n = t.slice()
    return (n[6] = e[r]), n
  }
  function ve (t) {
    let e, r
    return {
      c () {
        ;(e = w('div')),
          (r = w('span')),
          (r.textContent = `${A('mod_badge')}`),
          p(
            e,
            'class',
            'mr-2 dark:bg-gray-500 bg-gray-200 text-xs py-0.5 px-1 rounded dark:text-gray-100'
          )
      },
      m (n, l) {
        T(n, e, l), d(e, r)
      },
      p: $,
      d (n) {
        n && I(e)
      }
    }
  }
  function Ce (t) {
    let e = [],
      r = new Map(),
      n,
      l,
      i = t[1].replies.data
    const a = c => c[6].id
    for (let c = 0; c < i.length; c += 1) {
      let s = we(t, i, c),
        o = a(s)
      r.set(o, (e[c] = Se(o, s)))
    }
    return {
      c () {
        for (let c = 0; c < e.length; c += 1) e[c].c()
        n = Y()
      },
      m (c, s) {
        for (let o = 0; o < e.length; o += 1) e[o].m(c, s)
        T(c, n, s), (l = !0)
      },
      p (c, s) {
        s & 2 &&
          ((i = c[1].replies.data),
          H(),
          (e = be(e, s, a, 1, c, i, r, n.parentNode, ge, Se, n, we)),
          J())
      },
      i (c) {
        if (!l) {
          for (let s = 0; s < i.length; s += 1) O(e[s])
          l = !0
        }
      },
      o (c) {
        for (let s = 0; s < e.length; s += 1) j(e[s])
        l = !1
      },
      d (c) {
        for (let s = 0; s < e.length; s += 1) e[s].d(c)
        c && I(n)
      }
    }
  }
  function Se (t, e) {
    let r, n, l
    return (
      (n = new Ee({ props: { isChild: !0, comment: e[6] } })),
      {
        key: t,
        first: null,
        c () {
          ;(r = Y()), re(n.$$.fragment), (this.first = r)
        },
        m (i, a) {
          T(i, r, a), Q(n, i, a), (l = !0)
        },
        p (i, a) {
          e = i
          const c = {}
          a & 2 && (c.comment = e[6]), n.$set(c)
        },
        i (i) {
          l || (O(n.$$.fragment, i), (l = !0))
        },
        o (i) {
          j(n.$$.fragment, i), (l = !1)
        },
        d (i) {
          i && I(r), V(n, i)
        }
      }
    )
  }
  function Le (t) {
    let e, r, n
    return (
      (r = new ke({ props: { parentId: t[1].id, onSuccess: t[5] } })),
      {
        c () {
          ;(e = w('div')),
            re(r.$$.fragment),
            p(e, 'class', 'mt-4 pl-4 border-l-2 border-gray-200')
        },
        m (l, i) {
          T(l, e, i), Q(r, e, null), (n = !0)
        },
        p (l, i) {
          const a = {}
          i & 2 && (a.parentId = l[1].id),
            i & 1 && (a.onSuccess = l[5]),
            r.$set(a)
        },
        i (l) {
          n || (O(r.$$.fragment, l), (n = !0))
        },
        o (l) {
          j(r.$$.fragment, l), (n = !1)
        },
        d (l) {
          l && I(e), V(r)
        }
      }
    )
  }
  function We (t) {
    let e,
      r,
      n,
      l =
        (t[1].moderator && t[1].moderator.displayName
          ? t[1].moderator.displayName
          : t[1].by_nickname) + '',
      i,
      a,
      c,
      s,
      o = t[1].parsedCreatedAt + '',
      f,
      u,
      v,
      k = t[1].parsedContent + '',
      g,
      b,
      m,
      L,
      M,
      E,
      C,
      N,
      _ = t[1].moderatorId && ve(),
      S = t[1].replies.data.length > 0 && Ce(t),
      h = t[0] && Le(t)
    return {
      c () {
        ;(e = w('div')),
          (r = w('div')),
          (n = w('div')),
          (i = x(l)),
          (a = R()),
          _ && _.c(),
          (c = R()),
          (s = w('div')),
          (f = x(o)),
          (u = R()),
          (v = w('div')),
          (g = R()),
          S && S.c(),
          (b = R()),
          (m = w('div')),
          (L = w('button')),
          (L.textContent = `${A('reply_btn')}`),
          (M = R()),
          h && h.c(),
          p(n, 'class', 'mr-2 font-medium dark:text-gray-100'),
          p(r, 'class', 'flex items-center'),
          p(s, 'class', 'text-gray-500 text-sm dark:text-gray-400'),
          p(v, 'class', 'text-gray-500 my-2 dark:text-gray-200'),
          p(
            L,
            'class',
            'font-medium text-sm text-gray-500 dark:bg-transparent dark:text-gray-100'
          ),
          p(L, 'type', 'button'),
          p(e, 'class', 'my-4'),
          q(e, 'pl-4', t[2]),
          q(e, 'border-l-2', t[2]),
          q(e, 'border-color-gray-200', t[2]),
          q(e, 'cusdis-indicator', t[3])
      },
      m (y, z) {
        T(y, e, z),
          d(e, r),
          d(r, n),
          d(n, i),
          d(r, a),
          _ && _.m(r, null),
          d(e, c),
          d(e, s),
          d(s, f),
          d(e, u),
          d(e, v),
          (v.innerHTML = k),
          d(e, g),
          S && S.m(e, null),
          d(e, b),
          d(e, m),
          d(m, L),
          d(e, M),
          h && h.m(e, null),
          (E = !0),
          C || ((N = F(L, 'click', t[4])), (C = !0))
      },
      p (y, [z]) {
        ;(!E || z & 2) &&
          l !==
            (l =
              (y[1].moderator && y[1].moderator.displayName
                ? y[1].moderator.displayName
                : y[1].by_nickname) + '') &&
          X(i, l),
          y[1].moderatorId
            ? _
              ? _.p(y, z)
              : ((_ = ve()), _.c(), _.m(r, null))
            : _ && (_.d(1), (_ = null)),
          (!E || z & 2) && o !== (o = y[1].parsedCreatedAt + '') && X(f, o),
          (!E || z & 2) &&
            k !== (k = y[1].parsedContent + '') &&
            (v.innerHTML = k),
          y[1].replies.data.length > 0
            ? S
              ? (S.p(y, z), z & 2 && O(S, 1))
              : ((S = Ce(y)), S.c(), O(S, 1), S.m(e, b))
            : S &&
              (H(),
              j(S, 1, 1, () => {
                S = null
              }),
              J()),
          y[0]
            ? h
              ? (h.p(y, z), z & 1 && O(h, 1))
              : ((h = Le(y)), h.c(), O(h, 1), h.m(e, null))
            : h &&
              (H(),
              j(h, 1, 1, () => {
                h = null
              }),
              J()),
          (!E || z & 4) && q(e, 'pl-4', y[2]),
          (!E || z & 4) && q(e, 'border-l-2', y[2]),
          (!E || z & 4) && q(e, 'border-color-gray-200', y[2])
      },
      i (y) {
        E || (O(S), O(h), (E = !0))
      },
      o (y) {
        j(S), j(h), (E = !1)
      },
      d (y) {
        y && I(e), _ && _.d(), S && S.d(), h && h.d(), (C = !1), N()
      }
    }
  }
  function Ge (t, e, r) {
    let { comment: n } = e,
      { showReplyForm: l = !1 } = e,
      { isChild: i = !1 } = e
    const { showIndicator: a } = W('attrs'),
      c = o => {
        r(0, (l = !l))
      },
      s = () => {
        r(0, (l = !1))
      }
    return (
      (t.$$set = o => {
        'comment' in o && r(1, (n = o.comment)),
          'showReplyForm' in o && r(0, (l = o.showReplyForm)),
          'isChild' in o && r(2, (i = o.isChild))
      }),
      [l, n, i, a, c, s]
    )
  }
  class Ee extends fe {
    constructor (e) {
      super(),
        ce(this, e, Ge, We, le, { comment: 1, showReplyForm: 0, isChild: 2 })
    }
  }
  function Ne (t, e, r) {
    const n = t.slice()
    return (n[12] = e[r]), (n[14] = r), n
  }
  function Me (t, e, r) {
    const n = t.slice()
    return (n[15] = e[r]), n
  }
  function Oe (t) {
    let e,
      r,
      n,
      l,
      i,
      a,
      c,
      s,
      o,
      f,
      u,
      v,
      k,
      g,
      b,
      m = t[4] && Re(t)
    n = new ke({})
    const L = [Ve, Qe],
      M = []
    function E (C, N) {
      return C[3] ? 0 : 1
    }
    return (
      (s = E(t)),
      (o = M[s] = L[s](t)),
      {
        c () {
          ;(e = w('div')),
            m && m.c(),
            (r = R()),
            re(n.$$.fragment),
            (l = R()),
            (i = w('div')),
            (a = R()),
            (c = w('div')),
            o.c(),
            (f = R()),
            (u = w('div')),
            (v = R()),
            (k = w('div')),
            (g = w('a')),
            (g.textContent = `${A('powered_by')}`),
            p(i, 'class', 'my-8'),
            p(c, 'class', 'mt-4 px-1'),
            p(u, 'class', 'my-8'),
            p(g, 'class', 'underline '),
            p(g, 'href', 'https://cusdis.com'),
            p(
              k,
              'class',
              'text-center text-gray-500 dark:text-gray-100 text-xs'
            ),
            q(e, 'dark', t[1] === 'dark')
        },
        m (C, N) {
          T(C, e, N),
            m && m.m(e, null),
            d(e, r),
            Q(n, e, null),
            d(e, l),
            d(e, i),
            d(e, a),
            d(e, c),
            M[s].m(c, null),
            d(e, f),
            d(e, u),
            d(e, v),
            d(e, k),
            d(k, g),
            (b = !0)
        },
        p (C, N) {
          C[4]
            ? m
              ? m.p(C, N)
              : ((m = Re(C)), m.c(), m.m(e, r))
            : m && (m.d(1), (m = null))
          let _ = s
          ;(s = E(C)),
            s === _
              ? M[s].p(C, N)
              : (H(),
                j(M[_], 1, 1, () => {
                  M[_] = null
                }),
                J(),
                (o = M[s]),
                o ? o.p(C, N) : ((o = M[s] = L[s](C)), o.c()),
                O(o, 1),
                o.m(c, null)),
            (!b || N & 2) && q(e, 'dark', C[1] === 'dark')
        },
        i (C) {
          b || (O(n.$$.fragment, C), O(o), (b = !0))
        },
        o (C) {
          j(n.$$.fragment, C), j(o), (b = !1)
        },
        d (C) {
          C && I(e), m && m.d(), V(n), M[s].d()
        }
      }
    )
  }
  function Re (t) {
    let e, r
    return {
      c () {
        ;(e = w('div')),
          (r = x(t[4])),
          p(e, 'class', 'p-2 mb-4 bg-blue-500 text-white')
      },
      m (n, l) {
        T(n, e, l), d(e, r)
      },
      p (n, l) {
        l & 16 && X(r, n[4])
      },
      d (n) {
        n && I(e)
      }
    }
  }
  function Qe (t) {
    let e = [],
      r = new Map(),
      n,
      l,
      i,
      a = t[0].data
    const c = o => o[15].id
    for (let o = 0; o < a.length; o += 1) {
      let f = Me(t, a, o),
        u = c(f)
      r.set(u, (e[o] = Ae(u, f)))
    }
    let s = t[0].pageCount > 1 && Ie(t)
    return {
      c () {
        for (let o = 0; o < e.length; o += 1) e[o].c()
        ;(n = R()), s && s.c(), (l = Y())
      },
      m (o, f) {
        for (let u = 0; u < e.length; u += 1) e[u].m(o, f)
        T(o, n, f), s && s.m(o, f), T(o, l, f), (i = !0)
      },
      p (o, f) {
        f & 1 &&
          ((a = o[0].data),
          H(),
          (e = be(e, f, c, 1, o, a, r, n.parentNode, ge, Ae, n, Me)),
          J()),
          o[0].pageCount > 1
            ? s
              ? s.p(o, f)
              : ((s = Ie(o)), s.c(), s.m(l.parentNode, l))
            : s && (s.d(1), (s = null))
      },
      i (o) {
        if (!i) {
          for (let f = 0; f < a.length; f += 1) O(e[f])
          i = !0
        }
      },
      o (o) {
        for (let f = 0; f < e.length; f += 1) j(e[f])
        i = !1
      },
      d (o) {
        for (let f = 0; f < e.length; f += 1) e[f].d(o)
        o && I(n), s && s.d(o), o && I(l)
      }
    }
  }
  function Ve (t) {
    let e
    return {
      c () {
        ;(e = w('div')),
          (e.textContent = `${A('loading')}...`),
          p(e, 'class', 'text-gray-900 dark:text-gray-100')
      },
      m (r, n) {
        T(r, e, n)
      },
      p: $,
      i: $,
      o: $,
      d (r) {
        r && I(e)
      }
    }
  }
  function Ae (t, e) {
    let r, n, l
    return (
      (n = new Ee({ props: { comment: e[15], firstFloor: !0 } })),
      {
        key: t,
        first: null,
        c () {
          ;(r = Y()), re(n.$$.fragment), (this.first = r)
        },
        m (i, a) {
          T(i, r, a), Q(n, i, a), (l = !0)
        },
        p (i, a) {
          e = i
          const c = {}
          a & 1 && (c.comment = e[15]), n.$set(c)
        },
        i (i) {
          l || (O(n.$$.fragment, i), (l = !0))
        },
        o (i) {
          j(n.$$.fragment, i), (l = !1)
        },
        d (i) {
          i && I(r), V(n, i)
        }
      }
    )
  }
  function Ie (t) {
    let e,
      r = Array(t[0].pageCount),
      n = []
    for (let l = 0; l < r.length; l += 1) n[l] = Te(Ne(t, r, l))
    return {
      c () {
        e = w('div')
        for (let l = 0; l < n.length; l += 1) n[l].c()
      },
      m (l, i) {
        T(l, e, i)
        for (let a = 0; a < n.length; a += 1) n[a].m(e, null)
      },
      p (l, i) {
        if (i & 69) {
          r = Array(l[0].pageCount)
          let a
          for (a = 0; a < r.length; a += 1) {
            const c = Ne(l, r, a)
            n[a] ? n[a].p(c, i) : ((n[a] = Te(c)), n[a].c(), n[a].m(e, null))
          }
          for (; a < n.length; a += 1) n[a].d(1)
          n.length = r.length
        }
      },
      d (l) {
        l && I(e), Pe(n, l)
      }
    }
  }
  function Te (t) {
    let e,
      r = t[14] + 1 + '',
      n,
      l,
      i
    function a (...c) {
      return t[8](t[14], ...c)
    }
    return {
      c () {
        ;(e = w('button')),
          (n = x(r)),
          p(e, 'class', 'px-2 py-1 text-sm mr-2 dark:text-gray-200'),
          q(e, 'underline', t[2] === t[14] + 1)
      },
      m (c, s) {
        T(c, e, s), d(e, n), l || ((i = F(e, 'click', a)), (l = !0))
      },
      p (c, s) {
        ;(t = c), s & 4 && q(e, 'underline', t[2] === t[14] + 1)
      },
      d (c) {
        c && I(e), (l = !1), i()
      }
    }
  }
  function Xe (t) {
    let e,
      r,
      n = !t[5] && Oe(t)
    return {
      c () {
        n && n.c(), (e = Y())
      },
      m (l, i) {
        n && n.m(l, i), T(l, e, i), (r = !0)
      },
      p (l, [i]) {
        l[5]
          ? n &&
            (H(),
            j(n, 1, 1, () => {
              n = null
            }),
            J())
          : n
          ? (n.p(l, i), i & 32 && O(n, 1))
          : ((n = Oe(l)), n.c(), O(n, 1), n.m(e.parentNode, e))
      },
      i (l) {
        r || (O(n), (r = !0))
      },
      o (l) {
        j(n), (r = !1)
      },
      d (l) {
        n && n.d(l), l && I(e)
      }
    }
  }
  function Ze (t, e, r) {
    let { attrs: n } = e,
      { commentsResult: l } = e,
      i = 1,
      a = !0,
      c = '',
      s,
      o = n.theme || 'light'
    const f = Ye.create({ baseURL: n.host })
    function u (b) {
      r(4, (c = b))
    }
    me(() => {
      function b (m) {
        try {
          const L = JSON.parse(m.data)
          if (L.from === 'cusdis')
            switch (L.event) {
              case 'setTheme':
                r(1, (o = L.data))
                break
            }
        } catch {}
      }
      return (
        window.addEventListener('message', b),
        () => {
          window.removeEventListener('message', b)
        }
      )
    }),
      Z('api', f),
      Z('attrs', n),
      Z('refresh', v),
      Z('setMessage', u)
    async function v (b = 1) {
      r(3, (a = !0))
      try {
        const m = await f.get('/api/open/comments', {
          headers: { 'x-timezone-offset': -new Date().getTimezoneOffset() },
          params: { page: b, appId: n.appId, pageId: n.pageId }
        })
        r(0, (l = m.data.data))
      } catch (m) {
        r(5, (s = m))
      } finally {
        r(3, (a = !1))
      }
    }
    function k (b) {
      r(2, (i = b)), v(b)
    }
    me(() => {
      v()
    })
    const g = (b, m) => k(b + 1)
    return (
      (t.$$set = b => {
        'attrs' in b && r(7, (n = b.attrs)),
          'commentsResult' in b && r(0, (l = b.commentsResult))
      }),
      (t.$$.update = () => {
        t.$$.dirty & 2 &&
          document.documentElement.style.setProperty('color-scheme', o)
      }),
      [l, o, i, a, c, s, k, n, g]
    )
  }
  class et extends fe {
    constructor (e) {
      super(), ce(this, e, Ze, Xe, le, { attrs: 7, commentsResult: 0 })
    }
  }
  window.CUSDIS = {}
  const tt = window.parent,
    je = document.querySelector('#root'),
    nt = window.__DATA__
  new et({ target: je, props: { attrs: nt } })
  function qe (t, e = {}) {
    tt.postMessage(JSON.stringify({ from: 'cusdis', event: t, data: e }))
  }
  qe('onload'), ze()
  function ze () {
    qe('resize', document.documentElement.offsetHeight)
  }
  new MutationObserver(() => {
    ze()
  }).observe(je, { childList: !0, subtree: !0 })
})
