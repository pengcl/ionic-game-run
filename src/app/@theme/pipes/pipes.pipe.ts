import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'repairDate',
    pure: false
})

@Injectable()
export class RepairDatePipe implements PipeTransform {
    transform(value): any {
        if (!value) {
            return value;
        }
        value = value.split('.')[0].replace(/\-/g, '/');
        return value;
    }
}

@Pipe({
    name: 'players',
    pure: false
})

@Injectable()
export class PlayersPipe implements PipeTransform {
    transform(players, key?): any {
        if (!players) {
            return players;
        }
        players = players.filter(player => player.type);
        const gamers = [];
        players.forEach(player => {
            if (key) {
                gamers.push(player[key]);
            } else {
                gamers.push(player);
            }
        });
        return gamers;
    }
}

@Pipe({
    name: 'peripheries',
    pure: false
})

@Injectable()
export class PeripheriesPipe implements PipeTransform {
    transform(peripheries, key?): any {
        if (!peripheries) {
            return peripheries;
        }
        peripheries = peripheries.filter(periphery => !periphery.type);
        const gamers = [];
        peripheries.forEach(periphery => {
            if (key) {
                gamers.push(periphery[key]);
            } else {
                gamers.push(periphery);
            }
        });
        return gamers;
    }
}

@Pipe({
    name: 'amount',
    pure: false,
})

@Injectable()
export class AmountPipe implements PipeTransform {
    transform(matchers, gamer): any {
        if (!matchers) {
            return 0;
        }
        let amount = 0;
        let bombs = 0;
        let handfuls = 0;
        matchers.forEach(match => {
            match.list.forEach(record => {
                if (record.gamer.id === gamer.id) {
                    amount = amount + record.amount;
                    bombs = bombs + record.bombs;
                    handfuls = handfuls + record.handfuls;
                }
            });
        });
        const spanClass = amount > 0 ? 'winner' : amount < 0 ? 'loser' : 'num';
        const handfulClass = handfuls > 0 ? 'winner' : 'num';
        return '<span>' + gamer.name + '：</span><span>' + (amount >= 0 ? '赢' : '输') + '</span><span class="' + spanClass + '">' + amount + '</span><span>元</span>,<span class="num">' + bombs + '</span><span>' + '炸</span>,<span>' + '全关</span><span class="' + handfulClass + '">' + handfuls + '</span><br>';
    }
}
