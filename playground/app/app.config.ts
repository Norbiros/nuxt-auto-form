export default defineAppConfig({
  autoForm: {
    submit: {
      component: 'SubmitButton',
      props: {
        color: 'primary',
      },
    },
    metaStringProcessors: {
      upper: (value: string) => value.toUpperCase(),
    },
  },
})
