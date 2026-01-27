# Builder stage
FROM rustlang/rust:nightly as builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y pkg-config libssl-dev curl git && \
    rm -rf /var/lib/apt/lists/*

# Install ONNX Runtime
RUN curl -L -O https://github.com/microsoft/onnxruntime/releases/download/v1.19.2/onnxruntime-linux-x64-1.19.2.tgz && \
    tar -xzf onnxruntime-linux-x64-1.19.2.tgz && \
    mv onnxruntime-linux-x64-1.19.2/lib/libonnxruntime.so* /usr/lib/ && \
    rm -rf onnxruntime-linux-x64-1.19.2.tgz onnxruntime-linux-x64-1.19.2

ENV ORT_DYLIB_PATH=/usr/lib/libonnxruntime.so.1.19.2

# Configure Cargo to use git protocol for reliability
ENV CARGO_REGISTRIES_CRATES_IO_PROTOCOL=git
ENV CARGO_NET_GIT_FETCH_WITH_CLI=true

# Copy manifests
COPY Cargo.toml Cargo.lock ./

# Create dummy main.rs to build dependencies
RUN mkdir src && \
    echo "fn main() {println!(\"if you see this, the build broke\")}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Copy source code
COPY . .

# Copy local embedding model cache if present (optional)
RUN mkdir -p /usr/src/app/fastembed_cache

# Build application
# We touch the main file to ensure cargo rebuilds it
RUN touch src/main.rs && cargo build --release

# Runtime stage
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y openssl ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

# Install ONNX Runtime
RUN curl -L -O https://github.com/microsoft/onnxruntime/releases/download/v1.19.2/onnxruntime-linux-x64-1.19.2.tgz && \
    tar -xzf onnxruntime-linux-x64-1.19.2.tgz && \
    mv onnxruntime-linux-x64-1.19.2/lib/libonnxruntime.so* /usr/lib/ && \
    rm -rf onnxruntime-linux-x64-1.19.2.tgz onnxruntime-linux-x64-1.19.2

ENV ORT_DYLIB_PATH=/usr/lib/libonnxruntime.so.1.19.2

# Copy binary from builder
COPY --from=builder /usr/src/app/target/release/backend /app/backend

# Create embedding model cache directory
RUN mkdir -p /app/fastembed_cache

# Create uploads directory
RUN mkdir -p /app/uploads

EXPOSE 8080

CMD ["./backend"]
