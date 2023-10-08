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

// SchemaPatch struct for SchemaPatch
type SchemaPatch struct {
	// The json schema
	Data map[string]interface{} `json:"data"`
	// The user defined schema name
	Name string `json:"name"`
	AdditionalProperties map[string]interface{}
}

type _SchemaPatch SchemaPatch

// NewSchemaPatch instantiates a new SchemaPatch object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewSchemaPatch(data map[string]interface{}, name string) *SchemaPatch {
	this := SchemaPatch{}
	this.Data = data
	this.Name = name
	return &this
}

// NewSchemaPatchWithDefaults instantiates a new SchemaPatch object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewSchemaPatchWithDefaults() *SchemaPatch {
	this := SchemaPatch{}
	return &this
}

// GetData returns the Data field value
func (o *SchemaPatch) GetData() map[string]interface{} {
	if o == nil {
		var ret map[string]interface{}
		return ret
	}

	return o.Data
}

// GetDataOk returns a tuple with the Data field value
// and a boolean to check if the value has been set.
func (o *SchemaPatch) GetDataOk() (map[string]interface{}, bool) {
	if o == nil {
		return nil, false
	}
	return o.Data, true
}

// SetData sets field value
func (o *SchemaPatch) SetData(v map[string]interface{}) {
	o.Data = v
}

// GetName returns the Name field value
func (o *SchemaPatch) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *SchemaPatch) GetNameOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *SchemaPatch) SetName(v string) {
	o.Name = v
}

func (o SchemaPatch) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if true {
		toSerialize["data"] = o.Data
	}
	if true {
		toSerialize["name"] = o.Name
	}

	for key, value := range o.AdditionalProperties {
		toSerialize[key] = value
	}

	return json.Marshal(toSerialize)
}

func (o *SchemaPatch) UnmarshalJSON(bytes []byte) (err error) {
	varSchemaPatch := _SchemaPatch{}

	if err = json.Unmarshal(bytes, &varSchemaPatch); err == nil {
		*o = SchemaPatch(varSchemaPatch)
	}

	additionalProperties := make(map[string]interface{})

	if err = json.Unmarshal(bytes, &additionalProperties); err == nil {
		delete(additionalProperties, "data")
		delete(additionalProperties, "name")
		o.AdditionalProperties = additionalProperties
	}

	return err
}

type NullableSchemaPatch struct {
	value *SchemaPatch
	isSet bool
}

func (v NullableSchemaPatch) Get() *SchemaPatch {
	return v.value
}

func (v *NullableSchemaPatch) Set(val *SchemaPatch) {
	v.value = val
	v.isSet = true
}

func (v NullableSchemaPatch) IsSet() bool {
	return v.isSet
}

func (v *NullableSchemaPatch) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSchemaPatch(val *SchemaPatch) *NullableSchemaPatch {
	return &NullableSchemaPatch{value: val, isSet: true}
}

func (v NullableSchemaPatch) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSchemaPatch) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

