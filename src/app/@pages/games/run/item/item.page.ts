import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {ToastService} from '../../../../@core/modules/toast';
import {DialogService} from '../../../../@core/modules/dialog';
import {AuthService} from '../../../auth/auth.service';
import {RunService} from '../run.service';

import {forkJoin} from 'rxjs';
import {RecordComponent} from '../../../../@theme/components/record/record';
import {getIndex} from '../../../../utils/utils';
import {PeoplesComponent} from '../../../../@theme/components/peoples/peoples';

declare interface Match {
    no: number;
    list: any[];
}

const AMOUNT_DATA = {
    2: {
        1: 0,
        2: 5,
        3: 5,
        4: 10,
        5: 10,
        6: 10,
        7: 15,
        8: 15,
        9: 20,
        10: 20,
        11: 20,
        12: 25,
        13: 25,
        14: 30,
        15: 30,
        16: 30
    }
};

@Component({
    selector: 'app-games-run-item',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class GamesRunItemPage {
    id;
    game;
    matches;
    user = this.authSvc.currentUser;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private location: LocationStrategy,
                private modalController: ModalController,
                private toastSvc: ToastService,
                private dialogSvc: DialogService,
                private authSvc: AuthService,
                private runSvc: RunService) {
    }

    ionViewDidEnter() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getData();
    }

    getData() {
        this.toastSvc.loading('加载中..', 0);
        this.runSvc.game(this.id).subscribe(res => {
            this.toastSvc.hide();
            this.game = res;
            this.getRecord();
        });
    }

    getRecord() {
        this.runSvc.records({game: this.game.id}).subscribe(res => {
            const matches: Match[] = [];
            if (res.length > 0) {
                res.forEach(record => {
                    const index = getIndex(matches, 'no', record.no);
                    if (index > -1) {
                        matches[index].list.push(record);
                    } else {
                        matches.push({no: record.no, list: [record]});
                    }
                });
            }
            matches.forEach((match) => {// 结算每局结果
                const losersDetail = this.getLosersDetail(match.list);
                const winnersDetail = this.getWinnersDetail(losersDetail, match.list);
                match = this.settle(match, winnersDetail, losersDetail);
            });
            this.matches = matches;
        });
    }

    // 获取胜者信息（包括买码）
    getWinnersDetail(losersDetail, records) {
        const winnersRecords = [];
        let total = 0; // 胜者数量
        let bombs = 0;
        const surplus = losersDetail.surplus;

        // 计算全关数量
        const handfuls = (() => {
            let result = 0;
            losersDetail.records.forEach(record => {
                if (record.surplus === 16) {
                    result = result + 1;
                }
            });
            return result;
        })();
        records.forEach(record => {
            if (record.surplus === 0) {
                total = total + 1;
                bombs = bombs + record.bombs;
                record.handfuls = handfuls;
                winnersRecords.push(record);
            }
        });
        return {
            total,
            surplus,
            bombs,
            records: winnersRecords
        };
    }

    // 获取败者信息（包括买码）
    getLosersDetail(records) {
        const losersRecords = [];
        let total = 0; // 败者数量
        let surplus = 0;
        let bombs = 0;
        records.forEach(record => {
            if (record.surplus) {
                record.handfuls = 0;
                total = total + 1;
                bombs = bombs + record.bombs;
                if (record.surplus === 16) {
                    surplus = surplus + record.surplus * 2;
                } else if (record.surplus === 1) {
                } else {
                    surplus = surplus + record.surplus;
                }
                losersRecords.push(record);
            }
        });
        return {
            total,
            surplus,
            bombs,
            records: losersRecords
        };
    }

    // 结算
    settle(match, winnersDetail, losersDetail) {
        match.list = match.list.filter(record => record.surplus !== null);
        match.list.forEach(record => {
            if (record.surplus) {
                if (record.surplus === 1) {
                    record.amount = 0 + this.getBombsAmount(record, match.list);
                } else {
                    let cardAmount = record.surplus * record.game.price;
                    if (this.game.price === 2) {
                        cardAmount = AMOUNT_DATA[record.game.price][record.surplus];
                    } else {
                        cardAmount = record.surplus * record.game.price;
                    }
                    if (record.surplus === 16) {
                        record.amount = 0 - ((cardAmount * winnersDetail.total) * 2) +
                            this.getBombsAmount(record, match.list);
                    } else {
                        record.amount = 0 - (cardAmount * winnersDetail.total) +
                            this.getBombsAmount(record, match.list);
                    }
                }
            } else {
                let totalAmount = 0;
                losersDetail.records.forEach(item => {
                    let amount = 0;
                    if (item.surplus === 1) {
                        totalAmount = totalAmount + this.getBombsAmount(record, match.list);
                    } else {
                        let cardAmount = item.surplus * item.game.price;
                        // totalAmount = totalAmount + this.getBombsAmount(record, match.list);
                        if (this.game.price === 2) {
                            cardAmount = AMOUNT_DATA[item.game.price][item.surplus];
                        } else {
                            cardAmount = item.surplus * item.game.price;
                        }
                        if (record.surplus === 16) {
                            record.amount = 0 - ((cardAmount * winnersDetail.total) * 2) +
                                this.getBombsAmount(record, match.list);
                        } else {
                            /*record.amount = 0 - (cardAmount * winnersDetail.total) +
                                this.getBombsAmount(record, match.list);*/
                        }
                    }
                    let cardAmount = item.surplus * item.game.price;
                    if (this.game.price === 2) {
                        cardAmount = AMOUNT_DATA[item.game.price][item.surplus];
                    }
                    if (item.surplus === 16) {
                    } else if (item.surplus === 1) {
                    } else {

                    }
                    console.log(cardAmount);
                    amount = amount + cardAmount + this.getBombsAmount(record, match.list);
                });
                record.amount = amount;
            }
        });
        return match;
    }

    getBombsAmount(record, records) {
        records = JSON.parse(JSON.stringify(records));
        records.splice(getIndex(records, 'id', record.id), 1);
        let bombsAmount = record.bombs * 10 * records.length * this.game.price;
        records.forEach(item => {
            bombsAmount = bombsAmount - (item.bombs * 10 * this.game.price);
        });
        return bombsAmount;
    }

    async presentPeoplesModal(field: { label: string, name: string, value: string }) {
        const modal = await this.modalController.create({
            showBackdrop: true,
            component: PeoplesComponent,
            componentProps: {field}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
        if (data) {
            for (const key in data) {
                if (data[key]) {
                    this.runSvc.addGamer(data[key], 0).subscribe(gamer => {
                        const gamers = [];
                        this.game.gamers.forEach(item => {
                            gamers.push(item.id);
                        });
                        gamers.push(gamer.id);
                        this.runSvc.updateGame(this.game.id, {gamers}).subscribe(game => {
                            this.getData();
                            this.dialogSvc.show({content: '添加成功', cancel: '', confirm: '我知道了!'}).subscribe();
                        });
                    });
                }
            }
        }
    }

    async presentRecordModal() {
        const modal = await this.modalController.create({
            showBackdrop: true,
            component: RecordComponent,
            componentProps: {game: JSON.parse(JSON.stringify(this.game))}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
        if (data) {
            this.postRecord(data);
        }
    }

    postRecord(game) {
        const posts = [];
        game.gamers.forEach(gamer => {
            const body = {
                game: game.id,
                no: game.no,
                gamer: gamer.id,
                surplus: gamer.surplus,
                bombs: gamer.bombs
            };
            posts.push(this.runSvc.addRecord(body));
        });
        posts.push(this.runSvc.updateGame(game.id, {no: game.no + 1}));
        this.toastSvc.loading('处理中...', 0);
        forkJoin(posts).subscribe(res => {
            this.toastSvc.hide();
            this.getData();
        });
    }

    removeRecord(match) {
        const posts = [];
        match.list.forEach(record => {
            posts.push(this.runSvc.removeRecord(record.id));
        });
        posts.push(this.runSvc.updateGame(this.game.id, {no: this.game.no - 1}));
        this.toastSvc.loading('处理中...', 0);
        forkJoin(posts).subscribe(res => {
            this.toastSvc.hide();
            this.getData();
        });
    }

    requestFinish() {
        this.dialogSvc.show({content: '确定要结束游戏吗？', confirm: '是的！', cancel: '继续游戏'}).subscribe(res => {
            if (res.value) {
                this.finished();
            }
        });
    }

    finished() {
        this.toastSvc.loading('处理中...', 0);
        this.runSvc.finishGame(this.game.id).subscribe(res => {
            this.toastSvc.hide();
            this.router.navigate(['/index']).then();
        });
    }

    delete() {
        this.dialogSvc.show({content: '您确定要删除游戏吗？', cancel: '不了', confirm: '是的'}).subscribe(result => {
            if (result.value) {
                const posts = [];
                this.game.gamers.forEach(gamer => {
                    posts.push(this.runSvc.removeGamer(gamer.id));
                });
                this.game.records.forEach(record => {
                    posts.push(this.runSvc.removeRecord(record.id));
                });
                posts.push(this.runSvc.removeGame(this.game.id));
                this.toastSvc.loading('删除中...', 0);
                forkJoin(posts).subscribe(res => {
                    this.toastSvc.hide();
                    this.toastSvc.success('删除成功');
                    this.location.back();
                });
            }
        });
    }

}
