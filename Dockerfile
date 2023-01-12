FROM nikolaik/python-nodejs:latest as python

ENV PYTHONUNBUFFERED True

# Create Virtual Env
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# Create app directory and make it the WORKDIR
ENV APP_HOME /app
ENV FRONTEND /app/frontend
WORKDIR $APP_HOME

# Copy local code to the container image.
COPY . .

# Build React App for frontend
WORKDIR $FRONTEND
RUN npm install
RUN npm run build

# Install production dependencies.
WORKDIR $APP_HOME
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir wheel
RUN pip install --no-cache-dir -r requirements.txt

CMD exec uvicorn main:app --host 0.0.0.0 --port 8080 --reload