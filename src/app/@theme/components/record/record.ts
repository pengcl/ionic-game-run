import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {PickerService} from '../../../@core/modules/picker';
import {PlayersPipe} from '../../pipes/pipes.pipe';

import {DialogService} from '../../../@core/modules/dialog';
import {getIndex} from '../../../utils/utils';

@Component({
    selector: 'app-record',
    templateUrl: 'record.html',
    styleUrls: ['record.scss'],
    providers: [PlayersPipe]
})
export class RecordComponent {
    game;
    form: FormGroup;
    cards: any[] = Array(17)
        .fill(0, 0, 17)
        .map((v: any, i: number) => {
            return {
                label: i,
                value: i
            };
        });
    bombs: any[] = Array(5)
        .fill(0, 0, 5)
        .map((v: any, i: number) => {
            return {
                label: i,
                value: i
            };
        });

    constructor(private navParams: NavParams,
                private modalController: ModalController,
                private fb: FormBuilder,
                private playersPipe: PlayersPipe,
                private dialogSvc: DialogService,
                private pickerSvc: PickerService) {
        this.game = navParams.data.game;
        this.cards.unshift({label: '剩牌', value: -1});
        this.bombs.unshift({label: '炸弹', value: -1});
    }

    pickerShow(gamer) {
        const players = this.playersPipe.transform(this.game.gamers);
        if (gamer.type) {
            let hadWinner = false;
            players.forEach(player => {
                if (player.surplus === 0) {
                    hadWinner = true;
                }
            });
            this.pickerSvc.show([this.cards, this.bombs], '', [1, 1]).subscribe(res => {
                if (res.items[0].value === 0 && hadWinner) {
                    this.dialogSvc.show({content: '不能同时有两位玩家获胜，请确认成绩后重新选择！', confirm: '我知道了', cancel: ''}).subscribe();
                } else {
                    console.log(res);
                    if (res.items[0].value !== -1) {
                        gamer.surplus = res.items[0].value; // 剩余牌的数量
                    }
                    if (res.items[1].value !== -1) {
                        gamer.bombs = res.items[1].value; // 炸弹数量
                    }
                }
            });
        } else {
            players.forEach(player => {
                player.label = player.name;
                player.value = player.id;
            });
            const index = getIndex(players, 'name', gamer.player);
            this.pickerSvc.show([players], '', [index ? index : 0]).subscribe(res => {
                if (index > -1) { // 修改此人的买码记录，要先清空玩家的被买信息
                    players[index].periphery = null;
                }
                gamer.player = res.items[0].name; // 买码买中的玩家
                gamer.surplus = res.items[0].surplus; // 剩余牌的数量
                gamer.bombs = res.items[0].bombs; // 炸弹数量
                res.items[0].periphery = gamer.name;
            });
        }
    }

    validators() {
        let result = true;
        this.game.gamers.forEach(gamer => {
            if ((typeof gamer.surplus !== 'number' || typeof gamer.bombs !== 'number') && gamer.type) {
                result = false;
            }
        });
        return result;
    }

    submit() {
        const players = this.playersPipe.transform(this.game.gamers);
        let hadWinner = false;
        let handfuls = 0;
        players.forEach(player => {
            if (player.surplus === 0) {
                hadWinner = true;
            }
            if (player.surplus === 16) {
                handfuls = handfuls + 1;
            }
        });
        players.forEach(player => {
            if (player.surplus === 0) {
                player.handfuls = handfuls;
            }
        });
        if (hadWinner) {
            this.modalController.dismiss(this.game).then();
        } else {
            this.dialogSvc.show({content: '当前没有赢家！请合理填写记录', confirm: '我知道了！', cancel: ''}).subscribe();
        }
    }

    close() {
        this.modalController.dismiss().then();
    }
}
