# import os
# import sys
# import cv2
# import numpy as np
# from moviepy.editor import VideoFileClip
# from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
# from pydub import AudioSegment
# from pydub.silence import detect_nonsilent
# import speech_recognition as sr

# def analyze_audio_for_clips(video_path):
#     """Analyzes the audio for loudness peaks and detects non-silent sections."""
#     try:
#         audio = AudioSegment.from_file(video_path)
#     except Exception as e:
#         print(f"Error loading audio from video: {e}")
#         return []  # Return empty list if there's an error

#     # Detect non-silent chunks
#     non_silent_chunks = detect_nonsilent(audio, min_silence_len=500, silence_thresh=-40)
    
#     # Flatten chunks into seconds
#     interesting_times = [((start / 1000), (end / 1000)) for start, end in non_silent_chunks]
#     return interesting_times

# def analyze_video_for_clips(video_path):
#     """Analyzes the video for scene changes or motion intensity to identify interesting segments."""
#     cap = cv2.VideoCapture(video_path)
#     fps = cap.get(cv2.CAP_PROP_FPS)
#     frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     duration = frame_count / fps
    
#     # Store frame difference metrics
#     diff_array = []

#     ret, prev_frame = cap.read()
#     prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
        
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         diff = cv2.absdiff(prev_gray, gray)
#         diff_mean = np.mean(diff)
#         diff_array.append(diff_mean)
#         prev_gray = gray

#     cap.release()
    
#     # Detect scene changes based on the average differences
#     threshold = np.percentile(diff_array, 95)  # Top 5% most significant changes
#     interesting_segments = [(i / fps, (i + 30) / fps) for i, diff in enumerate(diff_array) if diff > threshold]

#     return interesting_segments

# def merge_segments(segments, min_gap=5):
#     """Merge segments to minimize overlap and ensure minimal gaps between them."""
#     merged_segments = []
#     last_end_time = 0

#     for start, end in segments:
#         # Ensure at least min_gap between segments
#         if start < last_end_time:
#             start = last_end_time
        
#         if end - start < 30:
#             end = start + 30
        
#         merged_segments.append((start, end))
#         last_end_time = end

#     return merged_segments

# def create_clips(video_path, segments, output_dir):
#     """Creates 30-second clips from the video based on the identified start times."""
#     if not os.path.exists(output_dir):
#         os.makedirs(output_dir)
    
#     clip_paths = []
#     video_clip = VideoFileClip(video_path)  # Load the full video once to get duration
#     video_duration = video_clip.duration

#     for i, (start_time, end_time) in enumerate(segments):
#         # Ensure the end_time does not exceed the video duration
#         if start_time + 30 <= video_duration:
#             end_time = start_time + 30
#         else:
#             end_time = video_duration

#         output_path = os.path.join(output_dir, f"clip_{i+1}.mp4")
#         ffmpeg_extract_subclip(video_path, start_time, end_time, targetname=output_path)
#         clip_paths.append(output_path)
#         print(f"Clip {i+1} created: {output_path}")

#         if i >= 3:  # Upper limit to 4 clips
#             break

#     return clip_paths

# def main():
#     video_path = sys.argv[1]  # Get video path from command line arguments
#     output_dir = "clips"

#     # Analyze video and audio
#     interesting_segments_audio = analyze_audio_for_clips(video_path)
#     interesting_segments_video = analyze_video_for_clips(video_path)

#     # Combine and sort the detected segments
#     all_segments = interesting_segments_audio + interesting_segments_video
#     all_segments = sorted(all_segments, key=lambda x: x[0])  # Sort by start time

#     # Merge segments to minimize overlaps and gaps
#     merged_segments = merge_segments(all_segments)

#     # Ensure the segments list isn't empty
#     if not merged_segments:
#         print("No interesting clips were found.")
#         return

#     # Create 30-second clips from the most interesting segments
#     clip_paths = create_clips(video_path, merged_segments, output_dir)
    
#     if not clip_paths:
#         print("No interesting clips were found.")
#     else:
#         print(f"{len(clip_paths)} clips have been generated and saved in {output_dir}.")

# if __name__ == "__main__":
#     main()



# import os
# import sys
# import cv2
# import numpy as np
# from moviepy.editor import VideoFileClip, vfx
# from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
# from pydub import AudioSegment
# from pydub.silence import detect_nonsilent
# import speech_recognition as sr

# def analyze_audio_for_clips(video_path):
#     """Analyzes the audio for loudness peaks and detects non-silent sections."""
#     try:
#         audio = AudioSegment.from_file(video_path)
#     except Exception as e:
#         print(f"Error loading audio from video: {e}")
#         return []  # Return empty list if there's an error

#     # Detect non-silent chunks
#     non_silent_chunks = detect_nonsilent(audio, min_silence_len=500, silence_thresh=-40)
    
#     # Flatten chunks into seconds
#     interesting_times = [((start / 1000), (end / 1000)) for start, end in non_silent_chunks]
#     return interesting_times

# def analyze_video_for_clips(video_path):
#     """Analyzes the video for scene changes or motion intensity to identify interesting segments."""
#     cap = cv2.VideoCapture(video_path)
#     fps = cap.get(cv2.CAP_PROP_FPS)
#     frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     duration = frame_count / fps
    
#     # Store frame difference metrics
#     diff_array = []

#     ret, prev_frame = cap.read()
#     prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
        
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         diff = cv2.absdiff(prev_gray, gray)
#         diff_mean = np.mean(diff)
#         diff_array.append(diff_mean)
#         prev_gray = gray

#     cap.release()
    
#     # Detect scene changes based on the average differences
#     threshold = np.percentile(diff_array, 95)  # Top 5% most significant changes
#     interesting_segments = [(i / fps, (i + 30) / fps) for i, diff in enumerate(diff_array) if diff > threshold]

#     return interesting_segments

# def merge_segments(segments, min_gap=5):
#     """Merge segments to minimize overlap and ensure minimal gaps between them."""
#     merged_segments = []
#     last_end_time = 0

#     for start, end in segments:
#         # Ensure at least min_gap between segments
#         if start < last_end_time:
#             start = last_end_time
        
#         if end - start < 30:
#             end = start + 30
        
#         merged_segments.append((start, end))
#         last_end_time = end

#     return merged_segments

# def create_clips(video_path, segments, output_dir, target_resolution=(1080, 1920)):
#     """Creates 30-second clips from the video based on the identified start times and resizes for Instagram."""
#     if not os.path.exists(output_dir):
#         os.makedirs(output_dir)
    
#     clip_paths = []
#     video_clip = VideoFileClip(video_path)  # Load the full video once to get duration
#     video_duration = video_clip.duration

#     for i, (start_time, end_time) in enumerate(segments):
#         # Ensure the end_time does not exceed the video duration
#         if start_time + 30 <= video_duration:
#             end_time = start_time + 30
#         else:
#             end_time = video_duration

#         # Create subclip
#         subclip = video_clip.subclip(start_time, end_time)

#         # Resize for mobile (Instagram) - Aspect ratio 9:16 for vertical videos
#         resized_clip = subclip.resize(height=target_resolution[1])  # Resize height to 1920px
#         if resized_clip.w > target_resolution[0]:
#             resized_clip = resized_clip.fx(vfx.crop, width=target_resolution[0], x_center=resized_clip.w/2)  # Crop to 1080px width

#         output_path = os.path.join(output_dir, f"clip_{i+1}.mp4")
#         resized_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")
#         clip_paths.append(output_path)
#         print(f"Clip {i+1} created: {output_path}")

#         if i >= 3:  # Upper limit to 4 clips
#             break

#     return clip_paths

# def main():
#     video_path = sys.argv[1]  # Get video path from command line arguments
#     output_dir = "clips"

#     # Analyze video and audio
#     interesting_segments_audio = analyze_audio_for_clips(video_path)
#     interesting_segments_video = analyze_video_for_clips(video_path)

#     # Combine and sort the detected segments
#     all_segments = interesting_segments_audio + interesting_segments_video
#     all_segments = sorted(all_segments, key=lambda x: x[0])  # Sort by start time

#     # Merge segments to minimize overlaps and gaps
#     merged_segments = merge_segments(all_segments)

#     # Ensure the segments list isn't empty
#     if not merged_segments:
#         print("No interesting clips were found.")
#         return

#     # Create 30-second clips from the most interesting segments
#     clip_paths = create_clips(video_path, merged_segments, output_dir, target_resolution=(1080, 1920))
    
#     if not clip_paths:
#         print("No interesting clips were found.")
#     else:
#         print(f"{len(clip_paths)} clips have been generated and saved in {output_dir}.")

# if __name__ == "__main__":
#     main()


import os
import sys
import cv2
import numpy as np
from moviepy.editor import VideoFileClip, vfx
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from pydub import AudioSegment
from pydub.silence import detect_nonsilent
import speech_recognition as sr

def analyze_audio_for_clips(video_path):
    """Analyzes the audio for loudness peaks and detects non-silent sections."""
    try:
        audio = AudioSegment.from_file(video_path)
    except Exception as e:
        print(f"Error loading audio from video: {e}")
        return []  # Return empty list if there's an error

    # Detect non-silent chunks
    non_silent_chunks = detect_nonsilent(audio, min_silence_len=500, silence_thresh=-40)
    
    # Flatten chunks into seconds
    interesting_times = [((start / 1000), (end / 1000)) for start, end in non_silent_chunks]
    return interesting_times

def analyze_video_for_clips(video_path):
    """Analyzes the video for scene changes or motion intensity to identify interesting segments."""
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps
    
    # Store frame difference metrics
    diff_array = []

    ret, prev_frame = cap.read()
    if not ret:
        print(f"Error reading the first frame from {video_path}")
        cap.release()
        return []

    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        diff = cv2.absdiff(prev_gray, gray)
        diff_mean = np.mean(diff)
        diff_array.append(diff_mean)
        prev_gray = gray

    cap.release()
    
    # Detect scene changes based on the average differences
    threshold = np.percentile(diff_array, 95)  # Top 5% most significant changes
    interesting_segments = [(i / fps, (i + 30) / fps) for i, diff in enumerate(diff_array) if diff > threshold]

    return interesting_segments

def merge_segments(segments, min_gap=5):
    """Merge segments to minimize overlap and ensure minimal gaps between them."""
    merged_segments = []
    last_end_time = 0

    for start, end in segments:
        # Ensure at least min_gap between segments
        if start < last_end_time:
            start = last_end_time
        
        if end - start < 30:
            end = start + 30
        
        merged_segments.append((start, end))
        last_end_time = end

    return merged_segments

def create_clips(video_path, segments, output_dir, target_resolution=(1080, 1920)):
    """Creates 30-second clips from the video based on the identified start times and resizes for Instagram."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    clip_paths = []
    video_clip = VideoFileClip(video_path)  # Load the full video once to get duration
    video_duration = video_clip.duration

    for i, (start_time, end_time) in enumerate(segments):
        # Ensure start_time is within the video duration
        if start_time > video_duration:
            print(f"Warning: start_time {start_time} exceeds video duration {video_duration}. Skipping this segment.")
            continue

        # Ensure the end_time does not exceed the video duration
        if start_time + 30 <= video_duration:
            end_time = start_time + 30
        else:
            end_time = video_duration

        # Create subclip
        subclip = video_clip.subclip(start_time, end_time)

        # Resize for mobile (Instagram) - Aspect ratio 9:16 for vertical videos
        resized_clip = subclip.resize(height=target_resolution[1])  # Resize height to 1920px
        if resized_clip.w > target_resolution[0]:
            resized_clip = resized_clip.fx(vfx.crop, width=target_resolution[0], x_center=resized_clip.w/2)  # Crop to 1080px width

        output_path = os.path.join(output_dir, f"clip_{i+1}.mp4")
        resized_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")
        clip_paths.append(output_path)
        print(f"Clip {i+1} created: {output_path}")

        if i >= 3:  # Upper limit to 4 clips
            break

    video_clip.close()
    return clip_paths

def main():
    if len(sys.argv) < 2:
        print("Usage: python process_video.py <video_path>")
        return

    video_path = sys.argv[1]  # Get video path from command line arguments
    output_dir = "clips"

    # Analyze video and audio
    interesting_segments_audio = analyze_audio_for_clips(video_path)
    interesting_segments_video = analyze_video_for_clips(video_path)

    # Combine and sort the detected segments
    all_segments = interesting_segments_audio + interesting_segments_video
    all_segments = sorted(all_segments, key=lambda x: x[0])  # Sort by start time

    # Merge segments to minimize overlaps and gaps
    merged_segments = merge_segments(all_segments)

    # Ensure the segments list isn't empty
    if not merged_segments:
        print("No interesting clips were found.")
        return

    # Create 30-second clips from the most interesting segments
    clip_paths = create_clips(video_path, merged_segments, output_dir, target_resolution=(1080, 1920))
    
    if not clip_paths:
        print("No interesting clips were found.")
    else:
        print(f"{len(clip_paths)} clips have been generated and saved in {output_dir}.")

if __name__ == "__main__":
    main()
