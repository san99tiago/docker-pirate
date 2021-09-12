FROM ibmcom/websphere-traditional:latest

COPY --chown=was:root app.ear /work/config/app.ear
COPY --chown=was:root install_app.py /work/config/install_app.py
COPY --chown=was:root was-config.props /work/config/was-config.props

ENV ENABLE_BASIC_LOGGING=true

RUN /work/configure.sh