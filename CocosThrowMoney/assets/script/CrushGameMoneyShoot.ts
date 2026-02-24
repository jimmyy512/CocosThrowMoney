import { _decorator, instantiate, tween, v3, Node, sp, macro, game, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CrushGameMoneyShootSpine")
export default class CrushGameMoneyShootSpine extends Component {
    /** 模板：拖一枚原地翻轉的 Spine 金幣 */
    @property(sp.Skeleton) coinSkeleton!: sp.Skeleton;
    /** 噴射掛載節點 */
    @property(Node) moneyRoot!: Node;

    private readonly SPAWN_INTERVAL = 0.05;
    private _tmpCoinNode!: Node;

    protected onLoad(): void {
        // 1. 複製節點模板
        this._tmpCoinNode = instantiate(this.coinSkeleton.node);
        // 2. 將原本場景上的模板隱藏或移除（避免噴射時看到靜止的模板）
        this.coinSkeleton.node.active = false;
    }

    protected onEnable() {
        this.schedule(this.spawnCoin, this.SPAWN_INTERVAL, macro.REPEAT_FOREVER);
    }

    protected onDisable() {
        this.unschedule(this.spawnCoin);
    }

    private spawnCoin = () => {
        /* ---------- 1. 產生金幣 ---------- */
        const coinNode = instantiate(this._tmpCoinNode);
        coinNode.active = true;
        coinNode.setParent(this.moneyRoot);

        const startX = (Math.random() - 0.5) * 300;
        coinNode.setPosition(startX, 0);

        const scale = 1.5 + Math.random() * 0.4;
        coinNode.setScale(scale, scale, 1);
        
        const spinSpeed = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360);

        // --- Spine 動畫播放修改處 ---
        const skeleton = coinNode.getComponent(sp.Skeleton);
        if (skeleton) {
            // 参数說明：TrackIndex, AnimationName, Loop
            skeleton.setAnimation(0, "idle", true); 
            
            // 如果你的金幣有隨機皮膚，可以在這設定
            // skeleton.setSkin("gold"); 
        }

        /* ---------- 2. 二次貝茲曲線路徑 ---------- */
        const p0 = v3(startX, -50, 0);
        const dir = Math.random() > 0.5 ? 1 : -1;
        const endX = dir * (300 + Math.random() * 650);
        const endY = -80 - Math.random() * 140;
        const p2 = v3(endX, endY, 0);

        const height = 1800 + Math.random() * 400;
        const p1 = v3((startX + endX) * 0.4 + (Math.random() - 0.5) * 60, height, 0);

        /* ---------- 3. tween 執行移動與自轉 ---------- */
        const totalT = 1.4 + Math.random() * 0.6;
        const bezierObj = { t: 0 };

        tween(bezierObj)
            .to(totalT, { t: 1 }, {
                easing: "sineInOut",
                onUpdate: (target: { t: number }) => {
                    const t = target.t;
                    const one = 1 - t;
                    // 二次貝茲公式: (1-t)^2*P0 + 2t(1-t)*P1 + t^2*P2
                    const x = one * one * p0.x + 2 * one * t * p1.x + t * t * p2.x;
                    const y = one * one * p0.y + 2 * one * t * p1.y + t * t * p2.y;
                    
                    if (coinNode.isValid) {
                        coinNode.setPosition(x, y);
                        // 讓節點本身旋轉（模擬金幣亂飛的隨機感）
                        coinNode.angle += spinSpeed * game.deltaTime;
                    }
                },
                onComplete: () => {
                    if (coinNode.isValid) {
                        coinNode.destroy();
                    }
                },
            })
            .start();
    };
}
