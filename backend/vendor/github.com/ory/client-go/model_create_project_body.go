/*
Ory APIs

Documentation for all public and administrative Ory APIs. Administrative APIs can only be accessed with a valid Personal Access Token. Public APIs are mostly used in browsers. 

API version: v1.2.11
Contact: support@ory.sh
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package client

import (
	"encoding/json"
)

// CreateProjectBody Create Project Request Body
type CreateProjectBody struct {
	// The name of the project to be created
	Name string `json:"name"`
	AdditionalProperties map[string]interface{}
}

type _CreateProjectBody CreateProjectBody

// NewCreateProjectBody instantiates a new CreateProjectBody object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewCreateProjectBody(name string) *CreateProjectBody {
	this := CreateProjectBody{}
	this.Name = name
	return &this
}

// NewCreateProjectBodyWithDefaults instantiates a new CreateProjectBody object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewCreateProjectBodyWithDefaults() *CreateProjectBody {
	this := CreateProjectBody{}
	return &this
}

// GetName returns the Name field value
func (o *CreateProjectBody) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *CreateProjectBody) GetNameOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *CreateProjectBody) SetName(v string) {
	o.Name = v
}

func (o CreateProjectBody) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if true {
		toSerialize["name"] = o.Name
	}

	for key, value := range o.AdditionalProperties {
		toSerialize[key] = value
	}

	return json.Marshal(toSerialize)
}

func (o *CreateProjectBody) UnmarshalJSON(bytes []byte) (err error) {
	varCreateProjectBody := _CreateProjectBody{}

	if err = json.Unmarshal(bytes, &varCreateProjectBody); err == nil {
		*o = CreateProjectBody(varCreateProjectBody)
	}

	additionalProperties := make(map[string]interface{})

	if err = json.Unmarshal(bytes, &additionalProperties); err == nil {
		delete(additionalProperties, "name")
		o.AdditionalProperties = additionalProperties
	}

	return err
}

type NullableCreateProjectBody struct {
	value *CreateProjectBody
	isSet bool
}

func (v NullableCreateProjectBody) Get() *CreateProjectBody {
	return v.value
}

func (v *NullableCreateProjectBody) Set(val *CreateProjectBody) {
	v.value = val
	v.isSet = true
}

func (v NullableCreateProjectBody) IsSet() bool {
	return v.isSet
}

func (v *NullableCreateProjectBody) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableCreateProjectBody(val *CreateProjectBody) *NullableCreateProjectBody {
	return &NullableCreateProjectBody{value: val, isSet: true}
}

func (v NullableCreateProjectBody) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableCreateProjectBody) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

