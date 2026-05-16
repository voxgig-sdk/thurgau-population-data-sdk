package core

type ThurgauPopulationDataError struct {
	IsThurgauPopulationDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewThurgauPopulationDataError(code string, msg string, ctx *Context) *ThurgauPopulationDataError {
	return &ThurgauPopulationDataError{
		IsThurgauPopulationDataError: true,
		Sdk:              "ThurgauPopulationData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ThurgauPopulationDataError) Error() string {
	return e.Msg
}
