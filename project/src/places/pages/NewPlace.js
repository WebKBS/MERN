import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="에러가 났습니다!!" />
    </form>
  );
};

export default NewPlace;
