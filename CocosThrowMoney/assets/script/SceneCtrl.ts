import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneCtrl')
export class SceneCtrl extends Component {
    @property(Node) VisibleBtn: Node = null;
    @property(Node) HiddenBtn: Node = null;

    @property(Node) MoneyShotRoot: Node = null;

    start() {
        this.VisibleBtn.on(Node.EventType.TOUCH_END, this.onVisibleBtnClick, this);
        this.HiddenBtn.on(Node.EventType.TOUCH_END, this.onHiddenBtnClick, this);
    }


    onVisibleBtnClick() {
        this.MoneyShotRoot.active = true;
    }


    onHiddenBtnClick() {
        this.MoneyShotRoot.active = false;
    }
}


