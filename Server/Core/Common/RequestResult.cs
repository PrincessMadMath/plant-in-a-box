using System;

namespace Core.Common
{
    public class RequestResult<T>
    {
        public RequestResult(bool isSuccess, T result, string failureReason, Exception? exception)
        {
            IsSuccess = isSuccess;
            Result = result;
            FailureReason = failureReason;
            Exception = exception;
        }
        
        public bool IsSuccess { get; }

        public T Result { get; }

        public string FailureReason { get; }

        public Exception? Exception { get; }
    }

    public class RequestResultFactory
    {
        public static RequestResult<TA> Success<TA>(TA result)
        {
            return new RequestResult<TA>(true, result, string.Empty, null);
        }
        
        public static RequestResult<TA> Failure<TA>(string failureReason)
        {
            return new RequestResult<TA>(true, default(TA), failureReason, null);
        }
        
        public static RequestResult<TA> Failure<TA>(string failureReason, Exception exception)
        {
            return new RequestResult<TA>(true, default(TA), failureReason, exception);
        }
    }
}