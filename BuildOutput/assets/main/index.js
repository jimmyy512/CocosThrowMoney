System.register("chunks:///_virtual/CrushGameMoneyShoot.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,n,o,a,r,i,s,l,u,m,c,h,p,d;return{setters:[function(t){e=t.applyDecoratedDescriptor,n=t.inheritsLoose,o=t.initializerDefineProperty,a=t.assertThisInitialized},function(t){r=t.cclegacy,i=t._decorator,s=t.dragonBones,l=t.Node,u=t.instantiate,m=t.macro,c=t.v3,h=t.tween,p=t.game,d=t.Component}],execute:function(){var y,f,v,A,M,C,g;r._RF.push({},"3af6eplyklH+YQevVM1IS4B","CrushGameMoneyShoot",void 0);var b=i.ccclass,P=i.property;t("default",(y=b("CrushGameMoneyShoot"),f=P(s.ArmatureDisplay),v=P(l),y((C=e((M=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return e=t.call.apply(t,[this].concat(r))||this,o(e,"coinArmature",C,a(e)),o(e,"moneyRoot",g,a(e)),e.SPAWN_INTERVAL=.05,e._tmpCoinArmature=void 0,e.spawnCoin=function(){var t,n=u(e._tmpCoinArmature);n.setParent(e.moneyRoot);var o=300*(Math.random()-.5);n.setPosition(o,0);var a=1.5+.4*Math.random();n.setScale(a,a,1);var r=(Math.random()>.5?1:-1)*(360+360*Math.random());null==(t=n.getComponent(s.ArmatureDisplay))||t.playAnimation("play",0);var i=c(o,-50,0),l=(Math.random()>.5?1:-1)*(300+650*Math.random()),m=-80-140*Math.random(),d=c(l,m,0),y=1800+400*Math.random(),f=c(.4*(o+l)+60*(Math.random()-.5),y,0),v=1.4+.6*Math.random();h({t:0}).to(v,{t:1},{easing:"sineInOut",onUpdate:function(t){var e=t.t,o=1-e,a=o*o*i.x+2*o*e*f.x+e*e*d.x,s=o*o*i.y+2*o*e*f.y+e*e*d.y;n.setPosition(a,s),n.angle+=r*p.deltaTime},onComplete:function(){n.removeFromParent(),n.destroy()}}).start()},e}n(e,t);var r=e.prototype;return r.onLoad=function(){this._tmpCoinArmature=u(this.coinArmature.node),this.coinArmature.node.removeFromParent(),this.onEnable()},r.onEnable=function(){this.schedule(this.spawnCoin,this.SPAWN_INTERVAL,m.REPEAT_FOREVER)},r.onDisable=function(){this.unschedule(this.spawnCoin)},e}(d)).prototype,"coinArmature",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),g=e(M.prototype,"moneyRoot",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),A=M))||A));r._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./CrushGameMoneyShoot.ts","./SceneCtrl.ts"],(function(){return{setters:[null,null],execute:function(){}}}));

System.register("chunks:///_virtual/SceneCtrl.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,n,i,o,r,l,c,s;return{setters:[function(t){e=t.applyDecoratedDescriptor,n=t.inheritsLoose,i=t.initializerDefineProperty,o=t.assertThisInitialized},function(t){r=t.cclegacy,l=t._decorator,c=t.Node,s=t.Component}],execute:function(){var a,u,p,f,h,y,d,b,v;r._RF.push({},"c6f23fssqJOvI2SFnVj6S4y","SceneCtrl",void 0);var B=l.ccclass,C=l.property;t("SceneCtrl",(a=B("SceneCtrl"),u=C(c),p=C(c),f=C(c),a((d=e((y=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r))||this,i(e,"VisibleBtn",d,o(e)),i(e,"HiddenBtn",b,o(e)),i(e,"MoneyShotRoot",v,o(e)),e}n(e,t);var r=e.prototype;return r.start=function(){this.VisibleBtn.on(c.EventType.TOUCH_END,this.onVisibleBtnClick,this),this.HiddenBtn.on(c.EventType.TOUCH_END,this.onHiddenBtnClick,this)},r.onVisibleBtnClick=function(){this.MoneyShotRoot.active=!0},r.onHiddenBtnClick=function(){this.MoneyShotRoot.active=!1},e}(s)).prototype,"VisibleBtn",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),b=e(y.prototype,"HiddenBtn",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),v=e(y.prototype,"MoneyShotRoot",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),h=y))||h));r._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});