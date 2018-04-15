const moves = [
  {
    row: -2,
    col: 1
  }, {
    row: -1,
    col: 2
  }, {
    row: 1,
    col: 2
  }, {
    row: 2,
    col: 1
  }, {
    row: 2,
    col: -1
  }, {
    row: 1,
    col: -2
  }, {
    row: -1,
    col: -2
  }, {
    row: -2,
    col: -1
  }
];

const ordering = [
  [
    {
      order: '34261578',
      posLimit: (m) => new Position(m - 1, m - 2)
    }, {
      order: '87642135',
      posLimit: (m) => new Position(2,2)
    }, {
      order: '51867342',
      posLimit: (m) => new Position(m - 8, 1)
    }, {
      order: '51342678',
      posLimit: (m) => new Position(7, m - 3)
    }, {
      order: '21435678',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34261578',
      posLimit: (m) => new Position(m - 1, m - 2)
    }, {
      order: '87642135',
      posLimit: (m) => new Position(2, 2)
    }, {
      order: '51324678',
      posLimit: (m) => new Position(m - 6, Math.floor((m - 1) / 2) + 5)
    }, {
      order: '32481765',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34261578',
      posLimit: (m) => new Position(6, 1)
    }, {
      order: '87642135',
      posLimit: (m) => new Position(3, 1)
    }, {
      order: '54132678',
      posLimit: (m) => new Position(m - 15, 4)
    }, {
      order: '52431678',
      posLimit: (m) => new Position(10, m - 2)
    }, {
      order: '85647123',
      posLimit: (m) => new Position(5, Math.floor(m / 2) - 3)
    }, {
      order: '15746823',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34625718',
      posLimit: (m) => new Position(m - 1, m - 2)
    }, {
      order: '42681357',
      posLimit: (m) => new Position(m - 6, m )
    }, {
      order: '86512347',
      posLimit: (m) => new Position(2, 5)
    }, {
      order: '51867342',
      posLimit: (m) => new Position(m - 10, 3)
    }, {
      order: '61825437',
      posLimit: (m) => new Position(Math.floor((m - 1) / 2) + 1, m - 2)
    }, {
      order: '71642538',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34261578',
      posLimit: (m) => new Position(m - 1, m - 2)
    }, {
      order: '87642135',
      posLimit: (m) => new Position(2, 2)
    }, {
      order: '51867342',
      posLimit: (m) => new Position(m - 8, 1)
    }, {
      order: '51342678',
      posLimit: (m) => new Position(10, m - 5)
    }, {
      order: '86753421',
      posLimit: (m) => new Position(13, Math.floor(m / 2)+1)
    }, {
      order: '78563421',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34261578',
      posLimit: (m) => new Position(m - 1, m - 2)
    }, {
      order: '87642135',
      posLimit: (m) => new Position(2,2)
    }, {
      order: '51324678',
      posLimit: (m) => (m % 16) === 5
        ? new Position(m - 2, Math.floor((m - 1) / 2) - 2)
        : new Position(m - 2, Math.floor((m - 1) / 2) - 6)
    }, {
      order: '15234678',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34261578',
      posLimit: (m) => new Position(6,1)
    }, {
      order: '87642135',
      posLimit: (m) => new Position(3,1)
    }, {
      order: '54132678',
      posLimit: (m) => new Position(m - 10, 1)
    }, {
      order: '52431678',
      posLimit: (m) => new Position(10, m - 2)
    }, {
      order: '85647123',
      posLimit: (m) => new Position(3, Math.floor(m / 2) + 4)
    }, {
      order: '12453678',
      posLimit: (m) => new Position(-1, -1)
    }
  ],
  [
    {
      order: '34625718',
      posLimit: (m) => new Position(m - 1, m - 2)
    }, {
      order: '42681357',
      posLimit: (m) => new Position(m - 6, m)
    }, {
      order: '86512347',
      posLimit: (m) => new Position(2,5)
    }, {
      order: '51867342',
      posLimit: (m) => new Position(m - 6, 3)
    }, {
      order: '61825437',
      posLimit: (m) => new Position(Math.floor((m - 1) / 2) + 1, m - 2)
    }, {
      order: '61357284',
      posLimit: (m) => new Position(-1, -1)
    }
  ]
]