import { _decorator, instantiate, tween, v3, Node, dragonBones, macro, director, game, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CrushGameMoneyShoot")
export default class CrushGameMoneyShoot extends Component {
  /** 模板：拖一枚原地翻轉的龍骨金幣 */
  @property(dragonBones.ArmatureDisplay) coinArmature!: dragonBones.ArmatureDisplay;
  /** 噴射掛載節點（建議放在 UI 最上層） */
  @property(Node) moneyRoot!: Node;

  /** 單枚產生間隔（越小越密集） */
  private readonly SPAWN_INTERVAL = 0.05; // 0.05 = 每秒大約 20 枚

  private _tmpCoinArmature!: Node;

  protected onLoad(): void {
    // 先複製一份
    this._tmpCoinArmature = instantiate(this.coinArmature.node);
    this.coinArmature.node.removeFromParent();

    // 啟動時默認噴射
    this.onEnable();
  }

  /** ===== 生命週期 ===== */
  protected onEnable() {
    // 開始無限噴
    this.schedule(this.spawnCoin, this.SPAWN_INTERVAL, macro.REPEAT_FOREVER);
  }

  protected onDisable() {
    this.unschedule(this.spawnCoin);
  }

  /** ===== 生一枚金幣並沿拋物線 tween ===== */
  private spawnCoin = () => {
    /* ---------- 1. 產生金幣 ---------- */
    const coinNode = instantiate(this._tmpCoinArmature);
    coinNode.setParent(this.moneyRoot);

    // 隨機起點 (±100) 讓中心不要那麼擁擠
    const startX = (Math.random() - 0.5) * 300; // -100 ~ 100
    coinNode.setPosition(startX, 0);

    // 旋轉深度參數
    const scale = 1.5 + Math.random() * 0.4; // 1.2 ~ 1.8
    coinNode.setScale(scale, scale, 1);
    const spinSpeed = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360);
    // 播原地翻轉動畫
    coinNode.getComponent(dragonBones.ArmatureDisplay)?.playAnimation("play", 0);

    /* ---------- 2. 二次貝茲曲線控制點 ---------- */
    // P0：起點
    const p0 = v3(startX, -50, 0);

    // P2：終點（左右更遠、Y 更低）
    const dir = Math.random() > 0.5 ? 1 : -1;
    const endX = dir * (300 + Math.random() * 650);
    const endY = -80 - Math.random() * 140; // -80~-220
    const p2 = v3(endX, endY, 0);

    // P1：峰頂
    const height = 1800 + Math.random() * 400;
    // apex X 再加個微亂數，形成不同弧度
    const p1 = v3((startX + endX) * 0.4 + (Math.random() - 0.5) * 60, height, 0);

    /* ---------- 3. tween ---------- */
    const totalT = 1.4 + Math.random() * 0.6; // 1.4~2 s
    const bezierObj = { t: 0 };

    tween(bezierObj)
      .to(
        totalT,
        { t: 1 },
        {
          easing: "sineInOut",
          onUpdate: ({ t }) => {
            // Bézier
            const one = 1 - t;
            const x = one * one * p0.x + 2 * one * t * p1.x + t * t * p2.x;
            const y = one * one * p0.y + 2 * one * t * p1.y + t * t * p2.y;
            coinNode.setPosition(x, y);

            // 自轉
            coinNode.angle += spinSpeed * game.deltaTime;
          },
          onComplete: () => {
            coinNode.removeFromParent();
            coinNode.destroy();
          },
        }
      )
      .start();
  };
}
