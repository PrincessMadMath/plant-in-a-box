using System;

namespace Core.Common
{
    public class RequestResult<T>
    {
        public RequestResult(bool isSuccess, T result, string failureReason, Exception? exception)
        {
            this.IsSuccess = isSuccess;
            this.Result = result;
            this.FailureReason = failureReason;
            this.Exception = exception;
        }

        public bool IsSuccess { get; }

        public T Result { get; }

        public string FailureReason { get; }

        public Exception? Exception { get; }
    }
}
