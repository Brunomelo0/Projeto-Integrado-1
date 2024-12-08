import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PageHeader({ title }) {
  return(
    <Container>
      <h1>{ title }</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
}