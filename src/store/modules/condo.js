const condoInfo = {
	state: {
    tower: '',
    unit: '',
	},
	mutations: {
		setCondoInfo: (state, info) => {
      state.tower = info.tower
      state.unit = info.unit
		},
	},
	actions: {
	}
}

export default condoInfo;