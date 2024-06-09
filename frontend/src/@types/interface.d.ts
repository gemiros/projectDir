declare namespace monster {
  interface foundation {
    kind: string;
    data: {
      name: string;
      memo: string;
      status: Array<any>;
      params: Array<any>;
      active: boolean;
      secret: boolean;
      invisible: boolean;
      hideStatus: boolean;
      commands: string;
    };
  }

  interface monster {
    Top: common.top;
    Status: common.status | familia.status | golem.status | ride.status;
    Parts: Array<common.part | ride.level>;
    Abilitys: Array<common.ability> | golem.abilitys;
    Bootys: Array<common.booty> | null;
    Explanation: string;
  }

  namespace common {
    interface top {
      race: string;
      lv: number;
      name: string;
    }

    interface status {
      habi: Array<string>;
      imp: number;
      int: string;
      lang: Array<string>;
      life: number;
      mind: number;
      perc: string;
      pop: number;
      preem: number;
      reac: string;
      speed: string;
      weak: string;
      weakValue: string;
    }

    interface part {
      core: boolean;
      name: string;
      hit: number;
      damage: number;
      avoid: number;
      protect: number;
      hp: number;
      mp: number;
    }

    interface ability {
      kind: Array<string>;
      name: string;
      use: string;
      explain: string;
    }

    interface booty {
      dice: string;
      item: string;
    }
  }

  namespace familia {
    interface status {
      preem: number;
      speed: string;
    }
  }

  namespace golem {
    interface status {
      habi: Array<string>;
      int: string;
      lang: Array<string>;
      life: number;
      mind: number;
      perc: string;
      pop: number;
      preem: number;
      reac: string;
      speed: string;
      weak: string;
      weakValue: string;
    }

    interface ability {
      using: boolean;
      item: string;
      kind: Array<string>;
      name: string;
      use: string;
      explain: string;
    }

    interface abilitys {
      max: number;
      abilitys: Array<ability>;
    }
  }

  namespace ride {
    interface status {
      value: string;
      int: string;
      lang: Array<string>;
      perc: string;
      speed: string;
      weak: string;
    }
    interface part {
      core: boolean;
      name: string;
      hit: number;
      damage: number;
      avoid: number;
      protect: number;
      hp: number;
      mp: number;
      lifeRes: number;
      mindRes: number;
    }
    interface level {
      lv: number;
      parts: Array<part>;
    }
  }
}
