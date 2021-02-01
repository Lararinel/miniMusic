Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    lists: {
      type: Array,
      value: []
    },
    max: {
      type: Number,
      value: 3
    },
    layout: {
      type: String,
      value: 'vertical'
    }
  },
});