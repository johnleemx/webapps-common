<script>
let count = 0;
export default {
    props: {
        id: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: ''
        },
        /**
         * Controls the alignment of the RadioButtons
         */
        alignment: {
            type: String,
            default: 'horizontal',
            validator(val) {
                return ['horizontal', 'vertical'].includes(val);
            }
        },
        /**
         * List of possible values. Each item must have an `id` and a `text` property
         * @example
         * [{
         *   id: 'pdf',
         *   text: 'PDF'
         * }, {
         *   id: 'XLS',
         *   text: 'Excel',
         * }]
         */
        possibleValues: {
            type: Array,
            default: () => [],
            validator(values) {
                if (!Array.isArray(values)) {
                    return false;
                }
                return values.every(item => item.hasOwnProperty('id') && item.hasOwnProperty('text'));
            }
        }
    },
    beforeCreate() {
        count += 1;
        this.count = count;
    },
    methods: {
        onInput($event) {
            /**
             * Fired when the radio button value changes.
             *
             * @event input
             * @type {String}
             */
            let value = $event.target.value;
            consola.trace('RadioButton value changed to', value);
            this.$emit('input', value);
        },
        hasSelection() {
            /* looks in the DOM if one radio button is checked */
            return this.$refs.input.some(x => x.checked);
        }
    }
};
</script>

<template>
  <div
    :id="id"
    :class="['radio-buttons', alignment]"
    role="radiogroup"
  >
    <label
      v-for="item of possibleValues"
      :key="`radio-${item.id}`"
    >
      <input
        ref="input"
        :checked="(value === item.id)"
        :value="item.id"
        :name="`wc-radio-${count}`"
        type="radio"
        @change="onInput"
      >
      <span :title="item.text">{{ item.text }}</span>
    </label>
  </div>
</template>

<style lang="postcss" scoped>
@import "webapps-common/ui/css/variables";

.radio-buttons {
  user-select: none;

  & label {
    position: relative;
    display: block;
    font-weight: 300;
    font-size: 13px;
    line-height: 18px;
    padding: 3px 3px 3px 23px;
    max-width: 100%;
    width: max-content;
    cursor: pointer;

    & input {
      opacity: 0;
      position: absolute;
      width: 0;
      height: 0;

      & + span {
        display: inline-block;
        width: 100%;
        min-width: 1em;
        color: var(--knime-masala);
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* ◯ */

      & + span::before {
        border: 1px solid var(--theme-radio-border-color);
        background: var(--theme-radio-background-color);
        display: inline-block;
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 100%;
        left: 0;
        top: 5px;
        position: absolute;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
      }

      &:hover + span::before {
        border: 1px solid var(--theme-radio-border-color-hover);
        background: var(--theme-radio-background-color-hover);
      }

      &:checked { /* 🔘 */

        & + span::before {
          background: var(--theme-radio-foreground-color-selected);
          border-color: var(--theme-radio-border-color-selected);
          content: '';
          box-shadow: inset 0 0 0 4px var(--theme-radio-background-color-selected);
        }

        &:hover + span::before {
          box-shadow: unset;
          background: radial-gradient(
            ellipse at center,
            var(--theme-radio-foreground-color-selected-hover) 0%,
            var(--theme-radio-foreground-color-selected-hover) 25%,
            var(--theme-radio-background-color-selected-hover) 26%,
            var(--theme-radio-background-color-selected-hover) 100%
          );
          border-color: var(--theme-radio-border-color-selected-hover);
        }
      }
    }
  }

  &.horizontal {
    display: flex;
    flex-wrap: wrap;

    & label {
      min-width: 0; /* sizing and text overflow with flexbox - see https://stackoverflow.com/a/26535469 */

      &:not(:last-of-type) {
        padding-right: 12px;
      }
    }
  }

  /* stylelint-disable no-descending-specificity */
  &:focus-within label input + span::before {
    border: 1px solid var(--theme-radio-border-color-focus);
  }
  /* stylelint-enable no-descending-specificity */
}

</style>
